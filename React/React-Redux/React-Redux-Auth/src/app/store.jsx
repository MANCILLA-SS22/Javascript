import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./apiSlice"
import { authReducer } from "../features/auth/authSlice"

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer
    },
    middleware: function (getDefaultMiddleware) {
        return getDefaultMiddleware().concat(apiSlice.middleware);
    },
    devTools: true
});