'use client';

import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { createOrder } from '@/lib/actions/order.actions';
import { PlaceOrderButton } from './place-order-btn';

function PlaceOrderForm() {
    const router = useRouter();

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        const res = await createOrder(); 
        console.log("createOrder", res.message);
        console.log("createOrder", res.success);
        console.log("createOrder", res.redirectTo);
        if (res.redirectTo) router.push(res.redirectTo);
    };

    return (
        <form onSubmit={handleSubmit} className='w-full'>
            <PlaceOrderButton />
        </form>
    );
};

export default PlaceOrderForm;