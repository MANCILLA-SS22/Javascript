import { getOrderById } from "@/lib/actions/order.actions";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import OrderDetailsTable from "./order-details-table";
import { ShippingAddress } from "@/types";

export const metadata: Metadata = {
    title: 'Order Details'
};

type Params = Promise<{ id: string }>;

// async function SignInPage(props: { params: Params}) {
async function OrderDetailsPage({ params }: { params: Params }) {
    const { id } = await params; //const { id } = await props.params;
    console.log("id", id);
    const order = await getOrderById(id);
    if (!order) notFound();

    // const res = { ...order, shippingAddress: shippingAddressSchema.parse(order.shippingAddress) }; // We could also use this line of code instead of the bellow one.
    const res = { ...order, shippingAddress: order.shippingAddress as ShippingAddress }; //(1)
    const res2 = process.env.PAYPAL_CLIENT_ID || 'sb';

    return <OrderDetailsTable order={res} paypalClientId={res2} />;
}

export default OrderDetailsPage;

// (1)
// shippingAddress: order.shippingAddress as ShippingAddress
// We use the above line of code because TypeScript doesn’t know the shape of order.shippingAddress, even if you know it's valid.
// And order.shippingAddress doesn't have a known type — it's likely just any, unknown, or a plain object. In this case, is an specific object coming from "shippingAddressSchema" and added to "insertOrderSchema".