import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { apiSlice } from '../features/api/apiSlice';

//The "API slice" also contains an auto - generated Redux slice reducer and a custom middleware that manages subscription lifetimes.Both of those need to be added to the Redux store
export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer //(1)
    },
    middleware: function (getDefaultMiddleware) { //(2)
        return getDefaultMiddleware().concat(apiSlice.middleware); //(3)
    },
    devTools: true
});

setupListeners(store.dispatch); //(4)

//(1) Add the generated reducer as a specific top-level slice. This is going to be dynamically named but whatever name we put in the reducerPath, remember we named it "api" inside apiSlice.js 
//(2) Adding the api middleware enables caching, invalidation, polling, and other useful features of `rtk-query`. 
//    The first thing we need to do is "getDefaultMiddleware", and that's the middleware that's already the default with redux, so we just need to make sure we have that
//(3) This is an array that's returned, then we use "concat", and then we also add "apiSlice.middleware" that we need that api slice creates, and this middleware from apiSlice manages caches lifetimes 
//    and expirations and it is required to use it when we're using RTK query and an apiSlice.
//(4) optional, but required for refetchOnFocus/refetchOnReconnect behaviors see `setupListeners` docs - takes an optional callback as the 2nd arg for customization