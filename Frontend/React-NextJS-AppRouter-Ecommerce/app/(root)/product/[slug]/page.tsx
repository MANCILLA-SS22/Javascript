import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import AddToCart from "@/components/shared/products/add-to-cart";
import ProductImages from "@/components/shared/products/product-images";
import ProductPrice from "@/components/shared/products/product-price";

import { getMyCart } from "@/lib/actions/cart.actions";
import { getProductBySlug } from "@/lib/actions/product.action";
import { Cart, Product } from "@/types";

async function ProductDetailsPage(props: { params: Promise<{ slug: string }> }) { //When using TypeScript, you can add types for params depending on your configured route segment.
    try {
        const { slug } = await props.params;
        const productData: Product | null = await getProductBySlug(slug);
        if (!productData) notFound();
        const product: Product = productData; // Now TypeScript knows it's not null
        const item = { productId: product.id, name: product.name, slug: product.slug, price: product.price, qty: 1, image: product.images![0] }
        const cart: Cart | undefined = await getMyCart();

        return (
            <section>
                <div className='grid grid-cols-1 md:grid-cols-5'>

                    <div className='col-span-2'>
                        <ProductImages images={product.images} />
                    </div>

                    <div className='col-span-2 p-5'>
                        <div className='flex flex-col gap-6'>
                            <p>{product.brand} {product.category}</p>
                            <h1 className='h3-bold'>{product.name}</h1>
                            <p>{product.rating} of {product.numReviews} Reviews</p>
                            <div className='flex flex-col sm:flex-row sm:items-center gap-3'>
                                <ProductPrice value={Number(product.price)} className='w-24 rounded-full bg-green-100 text-green-700 px-5 py-2' />
                            </div>
                        </div>
                        <div className='mt-10'>
                            <p className='font-semibold'>Description</p>
                            <p>{product.description}</p>
                        </div>
                    </div>

                    <div>
                        <Card>
                            <CardContent className='p-4'>
                                <div className='mb-2 flex justify-between'>
                                    <div>Price</div>
                                    <div>
                                        <ProductPrice value={Number(product.price)} />
                                    </div>
                                </div>
                                <div className='mb-2 flex justify-between'>
                                    <div>Status</div>
                                    {render1()}
                                </div>
                                {render2()}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        );

        function render1(): React.JSX.Element {
            if (product.stock > 0) return <Badge variant='outline'>In Stock</Badge>;
            return <Badge variant='destructive'>Out Of Stock</Badge>
        }

        function render2(): React.JSX.Element | undefined {
            if (product.stock > 0) return <div className='flex-center'><AddToCart cart={cart} item={item} /></div>
        }

    } catch (error) {
        console.log(error);
    }
};

export default ProductDetailsPage;

// import ProductImages from "@/components/shared/products/product-images";
// import ProductPrice from "@/components/shared/products/product-price";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { getProductBySlug } from "@/lib/actions/product.action";
// import { Product } from "@/types";
// import { notFound } from "next/navigation";
// import { JSX } from "react";

// async function ProductDetailsPage(props: { params: { slug: string } }): Promise<JSX.Element | undefined> {
//     try {
//         const { slug } = props.params;
//         const productData = await getProductBySlug(slug);
//         if (!productData) notFound();
//         const product: Product = productData; // Now TypeScript knows it's not null

//         function render1() {
//             if (product.stock > 0) {
//                 return <Badge variant='outline'>In Stock</Badge>;
//             } else {
//                 return <Badge variant='destructive'>Out Of Stock</Badge>
//             }
//         }

//         function render2() {
//             if (product.stock > 0) {
//                 return (
//                     <div className='flex-center'>
//                         <Button className='w-full'>Add To Cart</Button>
//                     </div>
//                 )
//             }
//         }

//         return (
//             <>
//                 <section>
//                     <div className='grid grid-cols-1 md:grid-cols-5'>

//                         {/* Images Column */}
//                         <div className='col-span-2'>
//                             <ProductImages images={product.images} />
//                         </div>

//                         {/* Details Column */}
//                         <div className='col-span-2 p-5'>
//                             <div className='flex flex-col gap-6'>
//                                 <p>{product.brand} {product.category}</p>
//                                 <h1 className='h3-bold'>{product.name}</h1>
//                                 <p>{product.rating} of {product.numReviews} Reviews</p>
//                                 <div className='flex flex-col sm:flex-row sm:items-center gap-3'>
//                                     <ProductPrice value={Number(product.price)} className='w-24 rounded-full bg-green-100 text-green-700 px-5 py-2' />
//                                 </div>
//                             </div>
//                             <div className='mt-10'>
//                                 <p className='font-semibold'>Description</p>
//                                 <p>{product.description}</p>
//                             </div>
//                         </div>

//                         {/* Action Column */}
//                         <div>
//                             <Card>
//                                 <CardContent className='p-4'>
//                                     <div className='mb-2 flex justify-between'>
//                                         <div>Price</div>
//                                         <div><ProductPrice value={Number(product.price)} /></div>
//                                     </div>
//                                     <div className='mb-2 flex justify-between'>
//                                         <div>Status</div>
//                                         {render1()}
//                                     </div>
//                                     {render2()}
//                                 </CardContent>
//                             </Card>
//                         </div>
//                     </div>
//                 </section>
//             </>
//         );

//     } catch (error) {
//         console.log(error);
//     }
// };

// export default ProductDetailsPage;