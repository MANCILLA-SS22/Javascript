import React, { useReducer } from 'react';
import { createContext } from 'react';

const CartContext = createContext({
    items: [],
    addItem: function(event){},
    removeItem: function(id){},
    clearCart: function(){}
});

function cartReducer(state, action){
    if (action.type === 'ADD_ITEM') {
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);
        const updatedItems = [...state.items]; //We create a copy of the old array
        
        if (existingCartItemIndex > -1) {//If this is true, it means that the item already exist in this items array.
            const existingItem = state.items[existingCartItemIndex]; //We get the info of the existing element according to its id.
            const updatedItem = { //In this object, we add the spreaded existing item and then, we add a quantity + 1, so that we can avoid duplicating the same element in the array.
                ...existingItem,
                quantity: existingItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem; //Finally, into the copy of the array, we overide (update) the repited item in the existingCartItemIndex, but increasing the quantity by 1 item.
        
        }else{ //If its' false, it means that we want to add this item, this incoming action.item.id to teh "items" array.
            updatedItems.push({ ...action.item, quantity: 1 }); //We push the new action into the memory. We spread the the selected item and then, we initialice it qith quantity = 1.
        }
        
        return { ...state, items: updatedItems }; //We return the updated state for the reducer. We'll return a nre object because we don't wanna edit the existing state.
    }
    

    if (action.type === 'REMOVE_ITEM') {
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);
        const updatedItems = [...state.items];
        const existingCartItem = state.items[existingCartItemIndex];

        if (existingCartItem.quantity === 1) {
            updatedItems.splice(existingCartItemIndex, 1);
        }else{
            const updatedItem = { //In this object, we add the spreaded existing item and then, we add a quantity + 1, so that we can avoid duplicating the same element in the array.
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return { ...state, items: updatedItems}
    }

    if(action.type === "CREAR_CART"){
        return {...state, items: []}
    }
}

export function CartContextProvider({children}){
    const [cart, dispatchCartAction] = useReducer(cartReducer, {items: []});

    function addItem(item){
        dispatchCartAction({type: "ADD_ITEM", item: item})
    }

    function removeItem(id){
        dispatchCartAction({type: "REMOVE_ITEM", id: id})
    }

    function clearCart(){
        dispatchCartAction({type: "CLEAR_CART"});
    }

    const cartContext = {
        items: cart.items,
        addItem: addItem,
        removeItem: removeItem,
        clearCart: clearCart
    }

    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    )
};

export default CartContext;