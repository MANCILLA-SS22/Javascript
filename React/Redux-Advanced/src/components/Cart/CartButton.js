import classes from './CartButton.module.css';
import { uiActions } from '../../features/ui/ui-slice';
import {useDispatch, useSelector} from "react-redux";

function CartButton(props){
  const dispatch = useDispatch();
  const cartQuantity = useSelector(state => state.cart.totalQuantity);

  function toggleCartHandler(){
    console.log(uiActions)
    dispatch(uiActions.toggle());
  }

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;