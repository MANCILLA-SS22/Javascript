import { cartActions } from "./cart-slice";
import { uiActions } from "../ui/ui-slice";

function fetchCartData(){
    return async function(dispatch){
        
        async function fetchData(){
            const response = await fetch('https://redux-c54d2-default-rtdb.firebaseio.com/cart.json');
            if (!response.ok) throw new Error('Could not fetch cart data!')
            const data = await response.json();
            return data;
        };

        try {
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart({ items: cartData?.items || [], totalQuantity: cartData?.totalQuantity || 0 }));                 //Metodo 1
            // if (cartData) dispatch(cartActions.replaceCart({ items: cartData.items || [], totalQuantity: cartData.totalQuantity || 0 }));  //Metodo 2
        } catch (error) {
            dispatch( uiActions.showNotification({status: 'error', title: 'Error!', message: 'Fetching cart data failed!'}) );
        };
    };
};

function sentCartData(cart){
    return async function(dispatch){

        async function sendRequest(){
            const parameters = {method: "PUT", body: JSON.stringify({ items: cart.items, totalQuantity: cart.totalQuantity })};
            const response = await fetch("https://redux-c54d2-default-rtdb.firebaseio.com/cart.json", parameters);
            if(!response.ok) throw new Error("Sending cart data failed.");
        };

        dispatch( uiActions.showNotification({status: "pending", title: "Sending...", message: "Sending cart data!"}) );
        try {
            await sendRequest();
            dispatch( uiActions.showNotification({status: "success", title: "Success!", message: "Sending cart successfully!"}) );
        }catch(error) {
            dispatch( uiActions.showNotification({status: "error", title: "Error...", message: "Sending cart data failed!"}) );
        }
    };
}

export { fetchCartData, sentCartData }