import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from '../features/api/apiSlice';

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer //(1)
    },
    middleware: function (getDefaultMiddleware) { //(2)
        return getDefaultMiddleware().concat(apiSlice.middleware); //(3)
    },
    devTools: true
});

export { store };

//(1) This is going to be dynamically named but whatever name we put in the reducerPath, remember we named it "api" inside apiSlice.js 
//(2) The first thing we need to do is "getDefaultMiddleware", and that's the middleware that's already the default with redux, so we just need to make sure we have that
//(3) This is an array that's returned, then we use "concat", and then we also add "apiSlice.middleware" that we need that api slice creates, and this middleware from apiSlice manages caches lifetimes 
//    and expirations and it is required to use it when we're using RTK query and an apiSlice.