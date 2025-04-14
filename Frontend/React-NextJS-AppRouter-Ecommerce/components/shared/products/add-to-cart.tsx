'use client'

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { Cart, CartItem } from "@/types";
import { Plus, Minus, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";

function AddToCart({ item, cart }: { item: CartItem, cart?: Cart }) {
    const { toast } = useToast();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const existItem = cart && cart.items.find((x) => x.productId === item.productId); // Check if item is in cart
    if (existItem) {
        return (
            <div>
                <Button type='button' variant='outline' onClick={handleRemoveFromCart}>
                    {isPending ? (<Loader className='w-4 h-4 animate-spin' />) : (<Minus className='w-4 h-4' />)}
                </Button>
                <span className='px-2'>{existItem.qty}</span>
                <Button type='button' variant='outline' onClick={handleAddToCart}>
                    {isPending ? (<Loader className='w-4 h-4 animate-spin' />) : (<Plus className='w-4 h-4' />)}
                </Button>
            </div>
        )
    } else {
        return (
            <Button className='w-full' type='button' onClick={handleAddToCart}>
                {isPending ? (<Loader className='w-4 h-4 animate-spin' />) : (<Plus className='w-4 h-4' />)}{' '}Add To Cart
            </Button>
        )
    }

    async function handleAddToCart() {
        startTransition(async function () {
            const res: { success: boolean, message: string } = await addItemToCart(item);
            if (!res.success) {
                toast({ variant: 'destructive', description: res.message, });
                return;
            }

            toast({
                description: res.message,
                action: <ToastAction className='bg-primary text-white hover:bg-gray-800' altText='Go To Cart' onClick={() => router.push('/cart')} >Go To Cart</ToastAction>
            });
        });
    };

    async function handleRemoveFromCart() {
        startTransition(async function () {
            const res: { success: boolean, message: string } | undefined = await removeItemFromCart(item.productId);
            toast({ variant: res?.success ? 'default' : 'destructive', description: res?.message, });
            return;
        });
    };
};

export default AddToCart;