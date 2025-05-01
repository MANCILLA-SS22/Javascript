import { Metadata } from "next";
import { Session } from "next-auth";
import { redirect } from "next/navigation";

import { getMyCart, getSession } from "@/lib/actions/cart.actions";
import { getUserById } from "@/lib/actions/user.actions";


export const metadata: Metadata = {
    title: "Shipping Address"
}

async function shippingAddressPage() {
    const cart = await getMyCart();                                        console.log("cart", cart);
    if(!cart || cart.items.length === 0) redirect("/cart");
    const session: Session | null = await getSession();                    console.log("session", session);
    const userId: string | undefined = session?.user?.id;
    if(!userId) throw new Error("No user ID");
    const user = await getUserById(userId);                                console.log("user", user);
    
    return (
        <>
            res
        </>
    );
}

export default shippingAddressPage;