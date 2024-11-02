import React, {useContext} from 'react';
import classes from "./MealItem.modle.css";
import MealItemForm from './MealItemForm';
import { CartContext } from '../../store/CartProvider';

function MealItem(props) {

    const cartCtx = useContext(CartContext);
    const price = `$${props.price.toFixed(2)}`;

    function AddToCartHandler(amount){
        cartCtx.addItem({
            id: props.id, 
            name: props.name,
            amount: amount,
            price: props.price
        })
    }

    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                
                <div className={classes.description}>
                    {props.description}
                </div>

                <div className={classes.price}>
                    {price}
                </div>
            </div>

            <div>
                <MealItemForm id={props.id} onAddToCart={AddToCartHandler}/>
            </div>
        </li>
    )
}

export default MealItem