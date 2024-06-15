import { configureStore } from "@reduxjs/toolkit";
import {counterReducer} from "./counterSlice";
import {authReducer} from "./authSlice.js"

const store = configureStore({
    reducer: {//reducer is used to get access to all the reducers in counterSlice and authSlice.
        counter: counterReducer,
        auth: authReducer
    }
});

export default store;