import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCartData, sentCartData } from './features/cart/cart-actions';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);

  //We can keep our logic for updating the cart inside of the reducer. We first update our Redux store and we're done with that. And then we select the updated store to send the request and that allows us 
  //to keep lean components create a fat Reducer with all the logic and then perform any side effects that might depend on our Redux state.
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch])

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) dispatch(sentCartData(cart));
  },[cart, dispatch]);

  return (
    <>
      {notification && (<Notification status={notification.status} title={notification.title} message={notification.message}/>)}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;

//When using Redux toolkit, is that it's prepared for dispatching function that returns another function (see cart-actions.js). It does not just accept action objects with a type property. Instead it also does 
//accept, action creators that return functions. And if it sees, that you're dispatching, a action which is actually a function, instead of action object, Redux will execute that function for you. And with that 
//function, we mean the anonymus functions in cart - actions.js, it will give us that "dispatch" argument automatically.So that in those executed functions(dispatch()), we can dispatch again, because there's a 
//such a common pattern that we wanna have action creators that can perform side effects.And that can then dispatch other actions, which eventually reach the reducers as part of a flow off side - effects, or as a 
//flow of steps that should be taken.So we can use a function that returns another function as an action as well.That's built into Redux when using redux-toolkit.