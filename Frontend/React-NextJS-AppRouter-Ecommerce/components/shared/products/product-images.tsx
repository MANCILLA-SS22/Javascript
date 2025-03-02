'use client';
import React, { ReactNode, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

function ProductImages({ images }: { images: string[] }) {
    const [current, setCurrent] = useState(0);

    console.log(current);

    function render(): React.JSX.Element[]{
        const res: React.JSX.Element[] = images.map(function(image, index){
            return (
                <div key={image} onClick={() => setCurrent(index)} className={cn('border mr-2 cursor-pointer hover:border-orange-600',current === index && 'border-orange-500' )} >
                    <Image src={image} alt='image' width={100} height={100} />
                </div>
            );
        });

        return res;
    }

    return (
        <div className='space-y-4'>
            <Image src={images[current]} alt='product image' width={1000} height={1000} className='min-h-[300px] object-cover object-center' />
            <div className='flex'>
                {render()}
            </div>
        </div>
    );
};

export default ProductImages;