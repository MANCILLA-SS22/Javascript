'use server';
import { prisma } from "@/db/prisma";
import { convertToPlainObject } from "../utils";
import { LATEST_PRODUCTS_LIMIT } from "../constants";

async function getLatestProducts(){
    const data = await prisma.product.findMany({
        take: LATEST_PRODUCTS_LIMIT,
        orderBy: {createdAt: 'desc'}
    });

    return convertToPlainObject(data);
};

export async function getProductBySlug(slug: string){
    const data = await prisma.product.findFirst({ where: { slug: slug } });
    return convertToPlainObject(data);
}

export {getLatestProducts}