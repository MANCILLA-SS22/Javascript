import { JSX } from "react";
import { Metadata } from "next";
import { Session } from "next-auth";

import { auth } from "@/auth";
import { getUserById } from "@/lib/actions/user.actions";
import PaymentMethodForm from "./payment-method-form";
import CheckoutSteps from "@/components/shared/checkout-steps";
import { User } from "@/types";

export const metadata: Metadata = { title: 'Select Payment Method' }

async function PaymentMethodPage(): Promise<JSX.Element> {
    const session: Session | null = await auth();
    const userId: string | undefined = session?.user?.id;
    if (!userId) throw new Error("User not found");
    const user: User = await getUserById(userId);

    return (
        <>
            <CheckoutSteps current={2} />
            <PaymentMethodForm preferredPaymentMethod={user.payment}/>
        </>
    );
}

export default PaymentMethodPage;