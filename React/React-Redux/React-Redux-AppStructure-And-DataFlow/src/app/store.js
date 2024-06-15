import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "../features/posts/postsSlice";
import { usersReducer } from "../features/users/usersSlice";

//Remember that anything asynchronous has to happen outside the store. To solve this is, is recommended to use redux middleware, and the most common async middleware is redux thunk.
export const store = configureStore({
    reducer: {
        posts: postsReducer,
        users: usersReducer
    }
});