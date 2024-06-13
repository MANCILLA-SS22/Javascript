import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState:{ items: [], totalQuantity: 0, changed: false },
    reducers: { //When using "action", we can send any kind of data and we'll get an object with the "type" and "payload" keys (they're default keys and aren't up to you) --> action.type  or  action.payload
        replaceCart(state, action){
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        },

        addItemToCart(state, action){
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            state.totalQuantity++;
            state.changed = true;
            if (!existingItem){
                state.items.push({ id: newItem.id, price: newItem.price, totalPrice: newItem.price, name: newItem.title, quantity: 1 });
            }else{
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price;
            }
        },

        removeItemFromCart(state, action){
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            state.totalQuantity--;
            state.changed = true;
            if (existingItem.quantity === 1){
                const filteredItems = state.items.filter(item => item.id !== id); 
                state.items = filteredItems;
            }else{
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price;
            }
        }
    }
});

//These are object which have the reducer method names as keys.
export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;