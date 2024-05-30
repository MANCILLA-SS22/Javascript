import { useContext } from "react";
import { CartContext } from "../store/shopping-cart-context";

function Cart() {
  const {items, updateItemQuntity} = useContext(CartContext); //If we'd have more properties in value={}, which belongs to <CartContext.Provider, then we could destructure this context object.

  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity,0);
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  let res1, res2;
  if(items.length === 0) res1 = <p>No items in cart!</p>
  if(items.length > 0){
    res2 = (
    <ul id="cart-items">
      {items.map(function(item){
        return (
          <li key={item.id}>
            <div>
              <span>{item.name}</span>
              <span>({`$${item.price.toFixed(2)}`})</span>
            </div>
            <div className="cart-item-actions">
              <button onClick={() => updateItemQuntity(item.id, -1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateItemQuntity(item.id, 1)}>+</button>
            </div>
          </li>
        );
      })}
    </ul>)
  }


  return (
    <div id="cart">
      {res1}
      {res2}
      <p id="cart-total-price">
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>
    </div>
  );
}

export default Cart;