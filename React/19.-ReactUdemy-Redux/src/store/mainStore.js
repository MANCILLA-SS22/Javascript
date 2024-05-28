/* import {createStore} from 'redux';
const store = createStore(countReducer);

function countReducer(state = initialState, action){
    if(action.type === "increment"){
        return{
            counter: state.counter + 1,
            showCounter: state.showCounter
        };
    }

    if(action.type === "increase"){
        return{
            counter: state.counter + action.amount,
            showCounter: state.showCounter
        };
    }
    
    if(action.type === "decrement"){
        return{
            counter: state.counter - 1,
            showCounter: state.showCounter
        };
    }

    if(action.type === "toggle"){
        return{
            counter: state.counter,
            showCounter: !state.showCounter
        };
    }

    return state;
};

export default store;
 */

/* //Method 2: Using both slices in this block of code
import {createSlice, configureStore} from "@reduxjs/toolkit";

const initialCounterState = {value: 0, showCounter: true};

const counterSlice = createSlice({
    name: "counter",
    initialState: initialCounterState,
    reducers:{
        increment(state){
            state.value++;
        },
        decrement(state){
            state.value--;
        },
        increase(state, action){
            state.value += action.payload; //(see line 114 un index.js to understand why we use "payload")
        },
        toggleCounter(state){
            state.showCounter = !state.showCounter;
        }
    }
});

const authSlice = createSlice({
    name: "authentication",
    initialState: {
        isAuthenticated: false
    },
    reducers: {
        login(state){
            state.isAuthenticated = true;
        },
        logout(state){
            state.isAuthenticated = false;

        }
    }
});

const store = configureStore({
    reducer: {//reducer is used to get access to all the reducers in counterSlice.
        counter: counterSlice.reducer, 
        auth: authSlice.reducer
    }
});

export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;

export default store;

//"actions" doesn't allow to access the reducers methods to find up, but instead we get methods created automatically by Redux Toolkit, which when called will create 
//action objects for us. These methods on the actions object here which we can call will create action objects for us. Therefore these methods are called action creators and 
//they will create action objects for us where these objects already have a type property with a unique identifier per action. Automatically created behind the scenes. 
// So we don't have to worry about action identifiers. We don't have to create those action objects on our own. We can tap into this actions key into this actions object on
//our createSlice and execute these action creator methods, which with their name match our reducer methods to dispatch actions, which will then ultimately trigger those different reducer methods.
 */

//Method 3: Separating both slices in two different files.
import {configureStore} from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import authReducer from "./authSlice.js"

const store = configureStore({
    reducer: {//reducer is used to get access to all the reducers in counterSlice and authSlice.
        counter: counterReducer, 
        auth: authReducer
    }
}); 

export default store;
