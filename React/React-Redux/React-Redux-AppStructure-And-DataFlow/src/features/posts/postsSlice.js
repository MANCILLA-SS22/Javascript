import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
const initialState = { posts: [], status: "idle", error: null };

const fetchPosts = createAsyncThunk('posts/fetchPosts', async function () { 
    const response = await axios.get(POSTS_URL);
    return response.data;
});

const addNewPost = createAsyncThunk('posts/addNewPost', async function (initialPost) {
    const response = await axios.post(POSTS_URL, initialPost);
    return response.data;
});

const updatePost = createAsyncThunk('posts/updatePost', async function (initialPost) {
    const { id } = initialPost;
    try {
        const response = await axios.put(`${POSTS_URL}/${id}`, initialPost)
        return response.data
    } catch (err) {
        //return err.message;
        return initialPost; // only for testing Redux!
    }
});

const deletePost = createAsyncThunk('posts/deletePost', async function (initialPost) {
    const { id } = initialPost;
    try {
        const response = await axios.delete(`${POSTS_URL}/${id}`)
        if (response?.status === 200) return initialPost;
        return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
        return err.message;
    }
});

const postsSlice = createSlice({
    name: "posts",
    initialState: initialState,
    reducers: {
        /* //Customizing Generated Action Creators
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload);
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        title,
                        content,
                        userId,
                        id: nanoid(),
                        date: new Date().toISOString(),
                        reactions: { thumbsUp: 0, wow: 0, heart: 0, rocket: 0, coffee: 0 }
                    }
                }
            }
        }, */
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload;
            const existingPost = state.posts.find(post => post.id === postId);
            if (existingPost) existingPost.reactions[reaction]++;
        }
    },
    extraReducers(builder) {
        builder
        .addCase(fetchPosts.pending, function(state, action){
            state.status = 'loading';
        })
        .addCase(fetchPosts.fulfilled, function (state, action) { //When we get fetchPosts.fulfilled, the "fetchPosts" function is executed first and then return an answer in "action.payload". After that, the rest of the code is executed
            state.status = 'succeeded';
            let min = 1;
            const loadedPosts = action.payload.map(function (post){ // Adding date and reactions
                post.date = sub(new Date(), { minutes: min++ }).toISOString();
                post.reactions = { thumbsUp: 0, wow: 0, heart: 0, rocket: 0, coffee: 0 };
                return post;
            });
            state.posts = state.posts.concat(loadedPosts);// Add any fetched posts to the array
        })
        .addCase(fetchPosts.rejected, function(state, action){
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(addNewPost.fulfilled, function (state, action) {
            const sortedPosts = state.posts.sort((a, b) => { // Fix for API post IDs: Creating sortedPosts & assigning the id would be not be needed if the fake API returned accurate new post IDs
                if (a.id > b.id) return 1
                if (a.id < b.id) return -1
                return 0
            });
            action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;
            action.payload.userId = Number(action.payload.userId); // End fix for fake API post IDs 
            action.payload.date = new Date().toISOString();
            action.payload.reactions = { thumbsUp: 0, wow: 0, heart: 0, rocket: 0, coffee: 0 };
            console.log(action.payload);
            state.posts.push(action.payload);
        })
        .addCase(updatePost.fulfilled, function(state, action){
            if (!action.payload?.id) {
                console.log('Update could not complete');
                console.log(action.payload);
                return;
            }
            const { id } = action.payload;
            action.payload.date = new Date().toISOString();
            const posts = state.posts.filter(post => post.id !== id);
            state.posts = [...posts, action.payload];
        })
        .addCase(deletePost.fulfilled, function(state, action){
            if (!action.payload?.id){
                console.log('Delete could not complete');
                console.log(action.payload);
                return;
            }
            const { id } = action.payload;
            const posts = state.posts.filter(post => post.id !== id);
            state.posts = posts;
        })
    }
});

function selectAllPosts(state) { return state.posts.posts };
function getPostsStatus(state) { return state.posts.status };
function getPostsError(state) { return state.posts.error };
function selectPostById(state, postId) {return state.posts.posts.find(post => post.id === postId)};
const postsReducer = postsSlice.reducer;
const postsActions = postsSlice.actions;

export { postsReducer, postsActions, selectAllPosts, getPostsStatus, getPostsError, selectPostById, fetchPosts, addNewPost, updatePost, deletePost };

//1. Define an Async Thunk: createAsyncThunk creates an action that handles async logic. It accepts two arguments: a string action type and an async function that returns a promise.
//2. Create a Slice: createSlice defines your slice of the state. In extraReducers, you handle the different states of the async thunk (pending, fulfilled, rejected) using the builder API.
//3. Configure the Store: The store is configured with the slice reducer.
//4. Dispatch the Thunk: The thunk is dispatched from a React component using the useDispatch hook. The component reacts to the state changes (loading, success, error) managed by the slice.

//Behind the Scenes
//1. Action Types: createAsyncThunk constructs action type strings for each lifecycle event(pending, fulfilled, rejected).
//2. Thunk Function: It returns a thunk function that the Redux Thunk middleware can intercept.This thunk dispatches the pending action, executes the async function, and dispatches either the fulfilled or rejected action based on the outcome.
//3. Payload Handling: The fulfilled action's payload is the resolved value from the async function. The rejected action's payload is the error encountered.
//4. Integration with Slices: The actions generated by the thunk can be handled in the slice’s extraReducers, which ensures the state is updated based on the action type and payload.

//Example Workflow
//1. Dispatch Thunk: dispatch(fetchPosts());
//2. Pending Action: { type: 'posts/fetchPosts/pending' }
//3. Async Function Execution: const response = await axios.get(https://jsonplaceholder.typicode.com/posts/);  If we were to get dispatch(fetchPosts(1)), then the url ended up like: https://jsonplaceholder.typicode.com/posts/1
//4. Fulfilled Action: If successful, { type: 'posts/fetchPosts/fulfilled', payload: response.data }
//5. Rejected Action: If error, { type: 'posts/fetchPosts/rejected', error: error.message }