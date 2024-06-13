import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCartData, sentCartData } from './store/cart-actions';
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

//configureStore(): The standard method for creating a Redux store. It wraps createStore to provide simplified configuration options and good defaults. It can automatically combine your slice reducers, adds whatever Redux middleware you supply, includes redux-thunk by default, and enables use of the Redux DevTools Extension.
//createReducer(): That lets you supply a lookup table of action types to case reducer functions, rather than writing switch statements. In addition, it automatically uses the immer library to let you write simpler immutable updates with normal mutative code, like state.todos[3].completed = true.
//createAction(): Generates an action creator function for the given action type string.
//createSlice(): Accepts an object of reducer functions, a slice name, and an initial state value, and automatically generates a slice reducer with corresponding action creators and action types.
//combineSlices(): Combines multiple slices into a single reducer, and allows "lazy loading" of slices after initialisation.
//createAsyncThunk: Accepts an action type string and a function that returns a promise, and generates a thunk that dispatches pending/fulfilled/rejected action types based on that promise
//createEntityAdapter: Generates a set of reusable reducers and selectors to manage normalized data in the store
//The createSelector Utility from the Reselect library, re-exported for ease of use.
//createApi(): The core of RTK Query's functionality. It allows you to define a set of endpoints and describe how to retrieve data from a series of endpoints, including configuration of how to fetch and transform that data. In most cases, you should use this once per app, with "one API slice per base URL" as a rule of thumb.
//fetchBaseQuery(): A small wrapper around fetch that aims to simplify requests. Intended as the recommended baseQuery to be used in createApi for the majority of users.
//<ApiProvider />: Can be used as a Provider if you do not already have a Redux store.
//setupListeners(): A utility used to enable refetchOnMount and refetchOnReconnect behaviors.
//useSelector: Read data from the store. Allows you to extract data from the Redux store state for use in this component, using a selector function.
//useDispatch: This hook returns a reference to the dispatch function from the Redux store. It returns the store's dispatch method to let you dispatch actions (which are into "reducers").

//Definition of "thunk": A thunk is simply a function, that delays an action until later, until something else finished. And we could write an action creator as a thunk, to write an action creator, which does not 
//immediately return the action object, but which instead, returns another function which eventually returns the action. So that we can run some other code before we then dispatch the actual action object that we did want to create. 

//When using Redux toolkit, is that it's prepared for dispatching function that returns another function (see cart-actions.js). It does not just accept action objects with a type property. Instead it also does 
//accept, action creators that return functions. And if it sees, that you're dispatching, a action which is actually a function, instead of action object, Redux will execute that function for you. And with that 
//function, we mean the anonymus functions in cart-actions.js, it will give us that "dispatch" argument automatically. So that in those executed functions (dispatch()), we can dispatch again, because there's a 
//such a common pattern that we wanna have action creators that can perform side effects. And that can then dispatch other actions, which eventually reach the reducers as part of a flow off side-effects, or as a 
//flow of steps that should be taken. So we can use a function that returns another function as an action as well. That's built into Redux when using redux-toolkit.