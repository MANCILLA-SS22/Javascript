import {createSlice} from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: "counter",
    initialState: {
        value: 0, 
        showCounter: true
    },
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

export const counterActions = counterSlice.actions;
export default counterSlice.reducer;

//"actions" doesn't allow to access the reducers methods to find up, but instead we get methods created automatically by Redux Toolkit, which when called will create
//action objects for us. These methods on the actions object here which we can call will create action objects for us. Therefore these methods are called action creators and
//they will create action objects for us where these objects already have a type property with a unique identifier per action. Automatically created behind the scenes.
// So we don't have to worry about action identifiers. We don't have to create those action objects on our own. We can tap into this actions key into this actions object on
//our createSlice and execute these action creator methods, which with their name match our reducer methods to dispatch actions, which will then ultimately trigger those different reducer methods.