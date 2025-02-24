import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import ProductPrice from './product-price';

function ProductCard ({ product }: { product: any }){

    function render(){
        if (product.stock > 0){
            return <ProductPrice value={+product.price}/>
        }else{
            return <p className='text-destructive'>Out Of Stock</p>;
        };
    }

    return (
        <Card className='w-full max-w-sm'>

            <CardHeader className='p-0 items-center'>
                <Link href={`/product/${product.slug}`}>
                    <Image src={product.images[0]} alt={product.name} height={300} width={300} priority={true} />
                </Link>
            </CardHeader>

            <CardContent className='p-4 grid gap-4'>
                <div className='text-xs'>{product.brand}</div>
                <Link href={`/products/${product.slug}`}><h2 className='text-sm font-medium'>{product.name}</h2></Link>
                <div className='flex-between gap-4'>
                    <p>{product.rating} Stars</p>
                    {render()}
                </div>
            </CardContent>

        </Card>
    );
};

export default ProductCard;