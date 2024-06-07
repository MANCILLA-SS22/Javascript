// Separating both slices in two different files.
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import authReducer from "./authSlice.js"

const store = configureStore({
    reducer: {//reducer is used to get access to all the reducers in counterSlice and authSlice.
        counter: counterReducer,
        auth: authReducer
    }
});

export default store;

/* import { createStore } from 'redux';
const store = createStore(countReducer);

function countReducer(state = initialState, action) {
    if (action.type === "increment") {
        return {
            counter: state.counter + 1,
            showCounter: state.showCounter
        };
    }

    if (action.type === "increase") {
        return {
            counter: state.counter + action.amount,
            showCounter: state.showCounter
        };
    }

    if (action.type === "decrement") {
        return {
            counter: state.counter - 1,
            showCounter: state.showCounter
        };
    }

    if (action.type === "toggle") {
        return {
            counter: state.counter,
            showCounter: !state.showCounter
        };
    }

    return state;
};

export default store; */