import React, { useContext } from 'react';
import classes from "./Cart.module.css";
import Modal from '../UI/Modal';
import { CartContext } from '../store/CartProvider';
import CartItem from './CartItem';

function Cart(props){
    const cartCtx = useContext(CartContext);
    
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    function cartItemRemoveHandler(id){
        cartCtx.removeItem(id);
    }

    function cartItemAddHandler(item){
        const res = {
            ...item, 
            amount: 1
        }

        cartCtx.addItem(res);
    }

    const zeta = cartCtx.items.map(function(event){
                    return (<CartItem 
                        key={event.id} 
                        name={event.name} 
                        amount={event.amount} 
                        price={event.price} 
                        onRemove={cartItemRemoveHandler.bind(null, event.id)} 
                        onAdd={cartItemAddHandler.bind(null, event)} />
                    )
                })

    return (
        <Modal onClose={props.onClose}>
            <ul className={classes["cart-items"]}>
                {zeta}
            </ul>

            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes["button--alt"]} onClick={props.onClose}>Close</button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    )
}

export default Cart;


/* We can't just write   

onRemove={cartItemRemoveHandler(item.id)}

since this would call the function immediately (and not when the cart item is clicked). So, if we want to pass params, we can either use bind (the first param is not used here, so we can write anything in this place)
                        
onRemove={cartItemRemoveHandler.bind(null, item.id)}
                        
or we can create an anonymous. They're both the same thing.
                        
function:  onRemove={() => cartItemRemoveHandler(item.id)} */