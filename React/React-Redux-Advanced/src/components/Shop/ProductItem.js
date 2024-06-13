import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import {useDispatch} from "react-redux";
import { cartActions } from '../../store/cart-slice';

function ProductItem({ title, price, description, id }){
  const dispatch = useDispatch();

  function addToCartHandler(){
    dispatch( cartActions.addItemToCart({ id: id, title: title, price: price }) );
  }

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;

//Where should our logic go? 
// - Synchronous, side-effect free code (i.e., data transformations)
//     > Prefer reducers
//     > Avoid action creators or componenets
// - Async code or code with side-effects
//     > Prefer action creators or components
//     > Never use reducers! 

/* import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { useDispatch } from "react-redux";
import { cartActions } from '../../store/cart-slice';

function ProductItem({ title, price, description, id }) {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  function addToCartHandler() {
    dispatch(cartActions.addItemToCart({ id: id, title: title, price: price }));
    fetch('firebase-url', { method: 'POST', body: JSON.stringify(newCart) })
    const newTotalQuantity = cart.totalQuantity + 1;
    const updatedItems = cart.items.slice(); // create copy via slice to avoid mutating original state
    const existingItem = updatedItems.find(item => item.id === id);
    if (existingItem) {
      const updatedItem = { ...existingItem }; // new object + copy existing properties to avoid state mutation
      updatedItem.quantity++;
      updatedItem.totalPrice += price;
      const existingItemIndex = updatedItems.findIndex(item => item.id === id);
      updatedItems[existingItemIndex] = updatedItem;
    }
    
    updatedItems.push({ id: id, price: price, quantity: 1, totalPrice: price, name: title, });
    const newCart = { totalQuantity: newTotalQuantity, items: updatedItems, };
    dispatch(cartActions.replaceCart(newCart));
  }


  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem; */