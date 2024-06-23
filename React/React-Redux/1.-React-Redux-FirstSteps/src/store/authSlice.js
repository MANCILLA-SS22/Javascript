import {createSlice} from "@reduxjs/toolkit";

const name = "authentication";
const initialState = { isAuthenticated: false };
const reducers = {
    login(state){ state.isAuthenticated = true; },
    logout(state){ state.isAuthenticated = false; }
}

const authSlice = createSlice({ name, initialState, reducers });

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;

// For createSlice() we can have a couple of reducers so it is plural (the property name) and there inside it you have your login and logout reducers.

// For configureStore(), to reference a slice of the global state, you need to reference it as a singular reducer. So if it is for counter, we extract the counterSlice's reducer. 
// If it is for auth, we do for so for authSlice