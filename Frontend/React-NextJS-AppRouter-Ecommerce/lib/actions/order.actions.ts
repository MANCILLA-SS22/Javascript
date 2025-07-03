'use server';

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { convertToPlainObject, formatError } from "../utils";
import { auth } from "@/auth";
import { getMyCart } from "./cart.actions";
import { getUserById } from "./user.actions";
import { insertOrderSchema } from "../constants/validators";
import { prisma } from "@/db/prisma";
import { CartItem, PaymentResult } from "@/types";
import { paypal } from "../paypal";
import { revalidatePath } from "next/cache";

export async function createOrder() {
    try {
        const session = await auth();
        if (!session) throw new Error('User is not authenticated');

        const userId = session?.user?.id;
        if (!userId) throw new Error('User not found');

        const cart = await getMyCart();
        if (!cart || cart.items.length === 0) return { success: false, message: 'Your cart is empty', redirectTo: '/cart' }

        const user = await getUserById(userId);
        if (!user.address) return { success: false, message: 'No shipping address', redirectTo: '/shipping-address' };
        if (!user.payment) return { success: false, message: 'No payment method', redirectTo: '/payment-method' };

        const orderValidation = insertOrderSchema.parse({
            userId: user.id,
            shippingAddress: user.address,
            payment: user.payment,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        });

        const insertedOrderId: string = await prisma.$transaction(async function (tx) { //"tx" represents all the models in the "schema.prisma" file. Like: "Product", "User", "Account", "Session", "VerificationToken", "Cart", "Order" and "OrderItem"
            const insertedOrder = await tx.order.create({ data: orderValidation }); // Create order

            for (const item of cart.items as CartItem[]) { // Create order items from the cart items
                const res = {
                    ...item,
                    price: item.price,
                    orderId: insertedOrder.id
                }

                await tx.orderItem.create({ data: res });
            }

            await tx.cart.update({ // Clear cart
                where: { id: cart.id },
                data: { items: [], totalPrice: 0, taxPrice: 0, shippingPrice: 0, itemsPrice: 0 }
            });

            return insertedOrder.id;
        });

        if (!insertedOrderId) throw new Error('Order not created');
        return { success: true, message: 'Order created', redirectTo: `/order/${insertedOrderId}` };

    } catch (error) {
        if (isRedirectError(error)) throw error;
        return { success: false, message: formatError(error) };
    }
}

export async function getOrderById(orderId: string) {
    const data = await prisma.order.findFirst({
        where: { id: orderId },
        include: {
            orderitem: true,
            user: {
                select: {
                    name: true,
                    email: true
                }
            }
        }
    });

    return convertToPlainObject(data);
};

export async function createPayPalOrder(orderId: string) {
    try {
        const order = await prisma.order.findFirst({ where: { id: orderId } });
        if (!order) throw new Error("Order not found");

        const paypalOrder = await paypal.createOrder(+order.totalPrice);
        await prisma.order.update({
            where: { id: orderId },
            data: {
                paymentResult: {
                    id: paypalOrder.id,
                    email_address: "",
                    status: "",
                    pricePaid: 0
                }
            }
        });

        return { success: true, message: "Item order created successfully", data: paypalOrder.id }
    } catch (error) {
        return { success: false, message: formatError(error) }
    }
};

export async function approvePayPalOrder(orderId: string, data: { orderID: string }) {
    try {
        const order = await prisma.order.findFirst({ where: { id: orderId } });
        if (!order) throw new Error("Order not found");
        const orderPaymentResult = order.paymentResult as PaymentResult;
        const paymentResultId: string = orderPaymentResult?.id;

        const captureData = await paypal.capturePayment(data.orderID);
        if (!captureData || captureData.id !== paymentResultId || captureData.status !== 'COMPLETED') throw new Error("Error in PayPal payment");
        const paymentResultObject = {
            id: captureData.id,
            status: captureData.status,
            email_address: captureData.payer.email_address,
            pricePaid: captureData.purchase_units[0]?.payments?.captures[0]?.amount?.value
        }

        await updateOrderToPaid({ orderId: orderId, paymentResult: paymentResultObject }); // Update order to paid
        revalidatePath(`/order${orderId}`);
        return { success: true, message: "Your order has been paid" };
    } catch (error) {
        return { success: false, message: formatError(error) };
    }
};

async function updateOrderToPaid({ orderId, paymentResult }: { orderId: string, paymentResult?: PaymentResult }) {
    const order = await prisma.order.findFirst({ where: { id: orderId }, include: { orderitem: true } });
    if (!order) throw new Error("Order not found");
    if (order.isPaid) throw new Error("Order is already paid");

    await prisma.$transaction(async function (tx) { // Transaction to update the order and the product quantities
        for (const item of order.orderitem) { // Update all qty in the db
            await tx.product.update({
                where: {
                    id: item.productId,
                },
                data: {
                    stock: {
                        increment: -item.qty,
                    },
                },
            });
        }

        await tx.order.update({ // Set order to paid
            where: {
                id: orderId,
            },
            data: {
                isPaid: true,
                paidAt: new Date(),
                paymentResult: paymentResult,
            },
        });
    });

    await verifyOrder(orderId);
}

async function verifyOrder(orderId: string) {  //Get updated order after transaction
    const updatedOrder = await prisma.order.findFirst({
        where: { id: orderId },
        include: {
            orderitem: true,
            user: {
                select: {
                    name: true,
                    email: true
                }
            }
        }
    });

    if (!updatedOrder) throw new Error("Order not found");
}