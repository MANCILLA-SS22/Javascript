'use server';

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { formatError } from "../utils";
import { auth } from "@/auth";
import { getMyCart } from "./cart.actions";
import { getUserById } from "./user.actions";
import { insertOrderSchema } from "../constants/validators";
import { prisma } from "@/db/prisma";
import { CartItem } from "@/types";

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
            paymentMethod: user.payment,
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