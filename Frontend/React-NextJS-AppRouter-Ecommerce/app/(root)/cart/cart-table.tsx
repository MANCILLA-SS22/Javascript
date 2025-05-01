'use client';

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { Cart, CartItem } from "@/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { ArrowRight, Loader, Minus, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

function CartTable({ cart }: { cart?: Cart }) {
    const router = useRouter();
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();

    function addingTransition(item: CartItem): void {
        startTransition(async function () {
            const res = await addItemToCart(item);
            if (!res?.success) toast({ variant: 'destructive', description: res?.message });
        });
    }

    function substractingTransition(item: CartItem): void {
        console.log('item', item);
        startTransition(async function () {
            const res = await removeItemFromCart(item.productId);
            if (!res?.success) toast({ variant: 'destructive', description: res?.message });
        });
    }

    function buttonTransition(): void {
        startTransition(function () {
            router.push("/shipping-address"); // push() works for navigating to /shipping address
        });
    }

    function subtotal() {
        return cart?.items.reduce((a, c) => a + c.qty, 0);
    }

    function tableUI() {
        if (!cart || cart.items.length === 0) {
            return <div>Cart is empty. <Link href='/'>Go Shopping</Link></div>
        } else {
            return (
                <div className="grid md:grid-cols-4 md:gap-5">
                    <div className="overflow-x-auto md:col-span-3">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Item</TableHead>
                                    <TableHead className='text-center'>Quantity</TableHead>
                                    <TableHead className='text-right'>Price</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    cart.items.map(function (item) {
                                        return (
                                            <TableRow key={item.slug}>
                                                <TableCell>
                                                    <Link href={`/product/${item.slug}`} className='flex items-center'>
                                                        <Image src={item.image} alt={item.name} width={50} height={50} />
                                                        <span className="px-2">{item.name}</span>
                                                    </Link>
                                                </TableCell>
                                                <TableCell className='flex-center gap-2'>
                                                    <Button disabled={isPending} variant='outline' type='button' onClick={() => substractingTransition(item)}> {/* (1) */}
                                                        {isPending ? <Loader className='w-4 h-4 animate-spin' /> : <Minus className='w-4 h-4' />}
                                                    </Button>
                                                    <span>{item.qty}</span>
                                                    <Button disabled={isPending} variant='outline' type='button' onClick={() => addingTransition(item)}> {/* (1) */}
                                                        {isPending ? <Loader className='w-4 h-4 animate-spin' /> : <Plus className='w-4 h-4' />}
                                                    </Button>
                                                </TableCell>
                                                <TableCell className='text-right'>${item.price}</TableCell>
                                            </TableRow>
                                        );
                                    })
                                }
                            </TableBody>

                        </Table>
                    </div>
                    <Card>
                        <CardContent className="p-4 gap-4">
                            <div className="pb-3 text-xl"> Subtotal ({subtotal()}) </div>
                            <span> {formatCurrency(cart.itemsPrice)} </span>
                            <Button className="w-full" disabled={isPending} onClick={() => buttonTransition()} >
                                {isPending ? <Loader className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />} {' '} Proceed to Checkout
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            );
        };
    };

    return (
        <>
            <h1 className="py-4 h2-hold">Shopping Cart</h1 >
            {tableUI()}
        </>
    )
}

export default CartTable;

//(1)
// ✅ onClick = {() => addingTransition(item)} ---> You're passing a function that will be called only when the button is clicked. It is a function that calls something() when triggered.
// ❌ onClick = { addingTransition(item) } --->  You're immediately calling the function when the component renders — not when the user clicks. It expects a function, not the result of a function.