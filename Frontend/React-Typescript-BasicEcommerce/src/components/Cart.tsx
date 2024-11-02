import useCart from "../hooks/useCart"
import { useState } from "react"
import CartLineItem from "./CartLineItem"

function Cart() {
    const [confirm, setConfirm] = useState<boolean>(false);
    const { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, sortedCart } = useCart();

    function onSubmitOrder() {
        dispatch({ type: REDUCER_ACTIONS.SUBMIT });
        setConfirm(true);
    }

    const tks = <h2>Thank you for your order.</h2>
    const msg = <>
        <h2 className="offscreen">Cart</h2>
        <ul className="cart">
            {
                sortedCart.map(function (item) {
                    return <CartLineItem key={item.sku} item={item} dispatch={dispatch} REDUCER_ACTIONS={REDUCER_ACTIONS} />
                })
            }
        </ul>
        <div className="cart__totals">
            <p>Total Items: {totalItems}</p>
            <p>Total Price: {totalPrice}</p>
            <button className="cart__submit" disabled={!totalItems} onClick={onSubmitOrder}> Place Order </button>
        </div>
    </>

    return (
        <main className="main main--cart">
            {confirm ? tks : msg}
        </main>
    );
}
export default Cart;