import { createSlice } from '@reduxjs/toolkit'

const name = "ui";
const initialState = { cartIsVisible: false, notification: null };
const reducers = { //When using "action", we can send any kind of data and we'll get an object with the "type" and "payload" keys (they're default keys and aren't up to you) --> action.type  or  action.payload
    toggle(state) {
        state.cartIsVisible = !state.cartIsVisible;
    },
    showNotification(state, action) {
        state.notification = { status: action.payload.status, title: action.payload.title, message: action.payload.message };
    }
};

const uiSlice = createSlice({ name, initialState, reducers });

export const uiActions = uiSlice.actions; //These are object which have the reducer method names as keys.
export const uiReducer = uiSlice.reducer;

//We still must not manipulate the existing state but the good thing is when using Redux toolkit and its functions like create slice, we can't accidentally manipulate the existing state. Because Redux toolkit 
//internally uses another package, called imgur, which will detect code like this and which will automatically clone the existing state, create a new state object, keep all the state which we're not editing, 
//and override the state which we are editing in an immutable way.

//"actions" doesn't allow to access the reducers methods to find up, but instead we get methods created automatically by Redux Toolkit, which when called will create action objects for us.
//These methods on the actions object which we can call will create action objects for us. Therefore these methods are called action creators and they will create action objects for us where these objects 
//already have a type property with a unique identifier per action. Automatically created behind the scenes. So we don't have to worry about action identifiers. We don't have to create those action objects on our own. 
//We can tap into this actions key into this actions object on our createSlice and execute these action creator methods, which with their name match our reducer methods to dispatch actions, which will then 
//ultimately trigger those different reducer methods.

// For createSlice() we can have a couple of reducers so it is plural (the property name) and there inside it you have your other reducers (actions). Like, "toggle" and "showNotification".
// For configureStore(), to reference a slice of the global state, you need to reference it as a singular reducer. So if it's for ui, we extract the uiSlice's reducer. 