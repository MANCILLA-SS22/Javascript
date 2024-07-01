import { configureStore } from "@reduxjs/toolkit";
import {uiReducer} from "../features/ui/ui-slice";
import {cartReducer} from "../features/cart/cart-slice";
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//We need to import the reducer functions and add it to our store. By defining a field inside the reducer parameter, we tell the store to use this slice reducer function to handle all updates to that state.
export const store = configureStore({
    reducer: { //reducer is used to get access to all the reducers in counterSlice and authSlice.
        ui: uiReducer,
        cart: cartReducer
    }
});

//Remember that reducer functions must be pure, side-effect free and synchronous. So your reducer functions should take some input in the case of the Redux reducer, the old state and the action, and then 
//produce some output. And that's, by the way not just the case for Redux reducer function. The reducer function you pass to use reducer, is react hook, works in the same way. It has nothing to do with redux, 
//but it just general reducer concept that you have a pure, side effects synchronous function that takes input and produces some output. And for the same input, for the same values, it will always produce the 
//same output, without any side effects that happen along the way without any asynchronous code that blocks it. No code of that kind must be part of your reducer functions.