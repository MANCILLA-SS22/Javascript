import { Metadata } from "next";
import { Session } from "next-auth";
import { redirect } from "next/navigation";

import { getMyCart } from "@/lib/actions/cart.actions";
import { getUserById } from "@/lib/actions/user.actions";
import CheckoutSteps from "@/components/shared/products/checkout-steps";
import ShippingAddressForm from "./shipping-address-form";
import { ShippingAddress } from "@/types";
import { auth } from "@/auth";


export const metadata: Metadata = {
    title: "Shipping Address"
}

async function shippingAddressPage() {
    const cart = await getMyCart();
    if (!cart || cart.items.length === 0) redirect("/cart");
    const session: Session | null = await auth();
    const userId: string | undefined = session?.user?.id;
    if (!userId) throw new Error("No user ID");
    const user = await getUserById(userId);

    return (
        <>
            <CheckoutSteps current={1} />
            <ShippingAddressForm address={user.address as ShippingAddress} />
        </>
    )
}

export default shippingAddressPage;