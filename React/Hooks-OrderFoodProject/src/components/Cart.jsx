import React, { useContext } from 'react'
import Modal from './UI/Modal';
import {CartContext} from '../Context/CartContext';
import { currencyFormatter } from '../util/formatting';
import Button from './UI/Button';
import UserProgressContext from '../Context/UserProgressContext';
import CartItem from './CartItem';

function Cart(){
    const {items, addItem, removeItem} = useContext(CartContext);
    const { hideCart, showCheckout, progress } = useContext(UserProgressContext);

    const cartTotal = items.reduce((totalPrice, item) => (totalPrice + item.quantity) * item.price, 0);

    function handleCloseCart() {
        hideCart();
    }

    function handleGoToCheckout() {
        showCheckout();
    }

    return (
        <Modal className="cart" open={progress === 'cart'} onClose={progress === "cart" ? handleCloseCart : null}>
            <h2>Your Cart</h2>

            <ul>
                { items.map(item => <CartItem key={item.id} name={item.name} quantity={item.quantity} price={item.price} onIncrease={() => addItem(item)} onDecrease={() => removeItem(item.id)}/>)  }
            </ul>

            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                {items.length > 0 && <Button onClick={handleGoToCheckout}>Go to Checkout</Button>}
            </p>
        </Modal>
    );
}

export default Cart;