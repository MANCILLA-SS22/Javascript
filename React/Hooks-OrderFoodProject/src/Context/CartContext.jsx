import { createContext, useReducer } from 'react';

export const CartContext = createContext({
    items: [],
    addItem: function(event){},
    removeItem: function(id){},
    clearCart: function(){}
});

function cartReducer(state, action){
    if (action.type === 'ADD_ITEM') {
        const updatedItems = [...state.items]; //We create a copy of the old array
        const existingCartItemIndex = state.items.findIndex((event) => event.id === action.item.id); //We look for the "id" from the element we're adding to, and verify if this "id" exists in the array or not.
        if (existingCartItemIndex > -1) {//If this is true, it means that the item already exists in this items array.
            const existingItem = state.items[existingCartItemIndex]; //We get the info of the existing element according to its id.
            const updatedItem = { //In this object, we add the spreaded existing item and then, we add a quantity + 1, so that we can avoid duplicating the same element in the array.
                ...existingItem,
                quantity: existingItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem; //Finally, into the copy of the array, we overide (update) the repited item in the existingCartItemIndex, but increasing the quantity by 1 item.
        
        } else { //If false, it means that we want to add the incoming "action.item" to the "items" array.
            updatedItems.push({ ...action.item, quantity: 1 }); //We push the new action into the memory. We spread the the selected item and then, we initialice it qith quantity = 1.
        }

        return { ...state, items: updatedItems }; //We return the updated state for the reducer. We'll return a nre object because we don't wanna edit the existing state.
    }

    if (action.type === 'REMOVE_ITEM') {
        const updatedItems = [...state.items];
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);
        const existingCartItem = state.items[existingCartItemIndex];

        if (existingCartItem.quantity === 1) updatedItems.splice(existingCartItemIndex, 1);
        
        const updatedItem = { //In this object, we add the spreaded existing item and then, we add a quantity + 1, so that we can avoid duplicating the same element in the array.
            ...existingCartItem,
            quantity: existingCartItem.quantity - 1,
        };

        updatedItems[existingCartItemIndex] = updatedItem;
        return { ...state, items: updatedItems}
    }

    if (action.type === "CREAR_CART") return { ...state, items: [] }

    return state;
}

function CartContextProvider({children}){
    const [cart, dispatchCartAction] = useReducer(cartReducer, {items: []});

    function addItem(item){
        dispatchCartAction({type: "ADD_ITEM", item: item});
    }

    function removeItem(id){
        dispatchCartAction({type: "REMOVE_ITEM", id: id});
    }

    function clearCart(){
        dispatchCartAction({type: "CLEAR_CART"});
    }

    const cartContext = { items: cart.items, addItem, removeItem, clearCart };


    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    )
};

export default CartContextProvider;