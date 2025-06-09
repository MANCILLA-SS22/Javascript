'use server';

import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import { Session } from "next-auth";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { CartItem } from "@/types";
import { convertToPlainObject, formatError, round2 } from "../utils";
import { cartItemSchema, insertCartSchema } from "../constants/validators";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

function calcPrice(items: CartItem[]) {
    const sum: number = items.reduce((acc, item) => acc + (Number(item.price) * item.qty), 0);
    const itemsPrice: number = round2(sum);
    const shippingPrice: number = round2(itemsPrice > 100 ? 0 : 10);
    const taxPrice: number = round2(itemsPrice * 0.15);
    const totalPrice: number = round2(itemsPrice + taxPrice + shippingPrice);

    return {
        itemsPrice: itemsPrice.toFixed(2),
        shippingPrice: shippingPrice.toFixed(2),
        taxPrice: taxPrice.toFixed(2),
        totalPrice: totalPrice.toFixed(2)
    }
}

async function getInfo() {
    const cartCookies: ReadonlyRequestCookies = await cookies();
    const sessionCartId: string | undefined = cartCookies.get('sessionCartId')?.value;
    if (!sessionCartId) throw new Error("Cart session not found.");
    const session: Session | null = await auth();
    const userId: string | undefined = session?.user?.id ? (session.user.id as string) : undefined;
    return { session, sessionCartId, userId };
}

async function getMyCart() {
    const { sessionCartId, userId } = await getInfo();
    const cart = await prisma.cart.findFirst({
        where: userId ? { userId: userId } : { sessionCartId: sessionCartId }
    });

    if (!cart) return undefined;

    const plainObject = convertToPlainObject({
        ...cart,
        items: cart.items as CartItem[],
        itemsPrice: cart.itemsPrice.toString(),
        totalPrice: cart.totalPrice.toString(),
        shippingPrice: cart.shippingPrice.toString(),
        taxPrice: cart.taxPrice.toString(),
    });

    return plainObject;
}

async function addItemToCart(data: CartItem) {
    try {
        const { sessionCartId, userId } = await getInfo();

        const item: CartItem = cartItemSchema.parse(data); //Parse and validate item
        const product = await prisma.product.findFirst({ where: { id: item.productId } }); // Find product in database
        if (!product) throw new Error('Product not found');

        const cart = await getMyCart();
        if (!cart) {
            const newCart = insertCartSchema.parse({ userId: userId, items: [item], sessionCartId: sessionCartId, ...calcPrice([item]) }); // Create new cart object
            console.log('newCart', newCart);
            await prisma.cart.create({ data: newCart }); // Add to database
            revalidatePath(`/product/${product.slug}`); // Revalidate product page    (1)
            return { success: true, message: `${product.name} added to cart` };
        } else {
            const existItem = cart.items as CartItem[];
            const findItem = existItem.find(x => x.productId === item.productId);
            if (findItem) {
                if (product.stock < findItem.qty + 1) throw new Error("Not enough stock");
                (cart.items as CartItem[]).find((x) => x.productId === item.productId)!.qty = findItem.qty + 1;
            } else {
                if (product.stock < 1) throw new Error("Not enough stock");
                cart.items.push(item);
            }

            await prisma.cart.update({
                where: { id: cart.id },
                data: { 
                    items: cart.items as Prisma.CartUpdateitemsInput[] ,
                    ...calcPrice(cart.items as CartItem[])
                },
            });

            revalidatePath(`/product/${product.slug}`); //(1)
            return { success: true, message: `${product.name} ${existItem ? 'updated in' : 'added to'} cart` }
        };

        // console.log({ 'Session Cart ID': sessionCartId, 'User ID': userId, 'Item Requested': item, 'Product Found': product });
    } catch (error) {
        return { success: false, message: formatError(error) };
    }
};

async function removeItemFromCart(productId: string) {
    try {
        await getInfo();
        const product = await prisma.product.findFirst({ where: { id: productId } });
        if (!product) throw new Error("Product not found");
        const cart = await getMyCart();
        if (!cart) throw new Error("Cart not found");
        const exist = (cart.items as CartItem[]);
        const foundItem = exist.find((x) => x.productId === productId);
        if (!foundItem) throw new Error("Item not found");

        foundItem.qty === 1 ? cart.items = exist.filter(x => x.productId !== productId) : foundItem!.qty = foundItem.qty - 1; //Using "!" ensures that foundItem.qty will be never null or undefined, even if the type system thinks it might be.

        await prisma.cart.update({
            where: { id: cart.id },
            data: {
                items: cart.items as Prisma.CartUpdateitemsInput[],
                ...calcPrice(cart.items as CartItem[]),
            },
        });

        revalidatePath(`/product/${product.slug}`); //(1)
        return { success: true, message: `${product.name} was removed from cart.` }
    } catch (error) {
        console.log("error", error);
    }
}

export { getInfo, addItemToCart, getMyCart, removeItemFromCart };

//(1)
// When we add something to the database a lot of times, we need to revalidate an specific page because we want to clear the cache. And in this case, it's app/(root)/product/[slug]/page.tsx
// This function is used when you want to manually trigger a cache revalidation for a specific route. It ensures that a server-rendered path is updated with fresh data the next time it’s requested. Like saying:
// “Hey, Next.js! This page is stale, go fetch a fresh version.”
// Why use revalidatePath()?
// Because Next.js caches server - rendered pages or data by default — especially when using Static Site Generation (SSG) or Route Handlers with caching. But sometimes your app’s data changes dynamically,
// like after a form submission, database update, or API call — and you want the user to see the updated info immediately. Without revalidation, they might still see the old, cached content.