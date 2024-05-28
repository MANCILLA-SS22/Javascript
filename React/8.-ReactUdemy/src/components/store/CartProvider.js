import { createContext, useReducer } from "react";

/* //Metodo 1: crear contexto estableciendo paramateros por defecto (no es obligatorio pero si requerido) 
export const CartContext = createContext({
    items: [],
    totalAmount: 0,
    addItem: function(item){},
    removeItem: function(id){}
}); */

//Metodo 2: crear contexto sin establecer parametros dentro
export const CartContext = createContext();

const defaultCartState = {
    items: [],
    totalAmount: 0
};

function CartReducer (state, action){  //state = initial state   <>   action = parameter into the dispatch function (or new item)

    if (action.type === "ADD") { 
        const uptatedTotalAmount = state.totalAmount + (action.item.price * action.item.amount); //item comes from the dispatchCartAction({}) function/
        
        const existingCartItemIndex = state.items.findIndex(event => event.id === action.item.id); //We verify if the current item we're looking at in the array, has the same id as the item we're adding with this "action" which was dispatched. If both of them are the same, then will return the index position. If not, it will return -1.
        const existingCartItem = state.items[existingCartItemIndex];
        let uptdatedItems; //We create a new object to which a new object will be added in case this doesn't exist.

        if (!existingCartItem) {
            uptdatedItems = state.items.concat(action.item); //Concat joins arrays and returns an array with the joined arrays. Here, our inital value (the old one) is into state, and the value that will be concatened to it, will be the one into "action".
        
        }else{
            const uptdatedItem = { //In case that we have 1 or more objects added to the cart
                ...existingCartItem, //then, we added the current values into the new uptdatedItem object (If we add the same meal twice, then it won't be overwritten, but the amount will change)
                amount: existingCartItem.amount + action.item.amount // and update only the new amount.
            }

            uptdatedItems = [...state.items]; //This is the new array where we copy the existing items so that I update this immutably without exiting the old array in memory, hence we're creating a new array where I copy the old objects.
            uptdatedItems[existingCartItemIndex] = uptdatedItem; //Now, for that existingCartItemIndex, we'll overwrite this with the uptdatedItem object.
        }
        
        return {
            items: uptdatedItems,
            totalAmount: uptatedTotalAmount
        }
    }    

    if (action.type === "REMOVE") {
        const existingCartItemIndex = state.items.findIndex(event => event.id === action.id);
        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;

        if(existingItem.amount === 1){
            updatedItems = state.items.filter(event => event.id !== action.id);
        }else{
            const updatedItem = {
                ...existingItem,
                amount: existingItem.amount - 1
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }

    }
    

    return defaultCartState;
}
    
function CartProvider(props){

    const [cartState, dispatchCartAction] = useReducer(CartReducer, defaultCartState);
    // console.log(cartState);
    
    function addItemToCartHandler(item){
        dispatchCartAction({type: "ADD", item: item});
    }

    function removeItemFromCartHandler(id){
        dispatchCartAction({type: "REMOVE", id: id});
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }; 

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;