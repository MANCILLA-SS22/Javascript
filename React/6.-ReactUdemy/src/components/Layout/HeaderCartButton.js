import { useContext, useState, useEffect } from 'react';
import CartIcon from '../Cart/CartIcon';
import classes from "./HeaderCartButton.module.css"
import { CartContext } from '../store/CartProvider';

function HeaderCartButton(props) {
    const [btnIsHighLighted, setBtnIsHighLighted] =  useState();

    const cartCtx = useContext(CartContext);
    const {items} = cartCtx;

    const numberOfCartItems = items.reduce(function (curNumber, item){
        return curNumber + item.amount;
    }, 0);

    const btnClasses = `${classes.button} ${btnIsHighLighted ? classes.bump : ""}`;


    useEffect(function(){
        if (items.length === 0) {
            return;
        }
        setBtnIsHighLighted(true);

        const timer = setTimeout(function(){
            setBtnIsHighLighted(false);
        }, 300)

        return function(){
            clearTimeout(timer)
        }

    }, [items]);

    return (
        <button className={btnClasses} onClick={props.onClick}>

            <span className={classes.icon}>
                <CartIcon/>
            </span>
            
            <span>Your cart</span>

            <span className={classes.badge}>
                {numberOfCartItems}
            </span>
        </button>
    )
}

export default HeaderCartButton