'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import classes from './image-slideshow.module.css';
import {images} from "../../data/images.js"

export default function ImageSlideshow() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(prevIndex => prevIndex < images.length - 1 ? prevIndex + 1 : 0);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    function render(){
        const res = images.map(function(image, index){
            return <Image key={index} src={image.image} className={index === currentImageIndex ? classes.active : ''} alt={image.alt} />
        });

        return res;
    }

    return (
        <div className={classes.slideshow}>
            {render()}
        </div>
    );
};