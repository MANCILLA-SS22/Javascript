import { createContext, useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";

export const CartContext = createContext({
    items: [],
    addItemToCart: function(){},
    updateItemQuntity: function(){}
});

function shoppingCartReducer(state, action){ //We've gotta define this function outside of the component function because shoppingCartReducer shouldn't be recreated whenever the component function executes. Becasue it also won't need direct access to any value defined or updated in the component function. It won't need access to props or anything like that. Hence I'm defining it ouside of the component funcion.
    if(action.type === "ADD_ITEM"){
        const updatedItems = [...state.items];
        const existingCartItemIndex = updatedItems.findIndex((cartItem) => cartItem.id === action.payload);
        const existingCartItem = updatedItems[existingCartItemIndex];

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        }else {
            const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload);
            updatedItems.push({
                id: action.payload,
                name: product.title,
                price: product.price,
                quantity: 1,
            });
        }

        return {
            ...state, //Not needed here because we have only one value. If we were to have more than one, then we should this spread operator so that we don't lose any data.
            items: updatedItems,
        };
    }

    if("UPDATE_ITEM"){
        const updatedItems = [...state.items];
        const updatedItemIndex = updatedItems.findIndex((item) => item.id === action.payload.productId);

        const updatedItem = {
            ...updatedItems[updatedItemIndex],
        };

        updatedItem.quantity += action.payload.amount;
        if (updatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
        }else{
            updatedItems[updatedItemIndex] = updatedItem;
        }

        return {
            ...state,
            items: updatedItems,
        };

    }

    return state;
}

export default function CartContextProvider({children}){

    const [shoppingCartState, shoppingCartDispatch] = useReducer(shoppingCartReducer, {items: []}); //The action we'll then dispatch, will indeed be the action we'll receive in shoppingCartReducer. The state we'll get in shoppingCartReducer, will be the guaranteed latest state snapshot of that state that is managed by useReducer()

    function handleAddItemToCart(id) {
        shoppingCartDispatch({
            type: "ADD_ITEM",
            payload: id
        });
    }

    function handleUpdateCartItemQuantity(productId, amount) {
        shoppingCartDispatch({
            type: "UPDATE_ITEM",
            payload: {
                productId: productId,
                amount: amount
            }
            
        });
    }

    const ctxValue = {
        items: shoppingCartState.items,
        addItemToCart: handleAddItemToCart,
        updateItemQuntity: handleUpdateCartItemQuantity,
    }

    return(
        <CartContext.Provider value={ctxValue}>
            {children}
        </CartContext.Provider>
    )
}