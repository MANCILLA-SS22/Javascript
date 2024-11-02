//Using react-toolkit, thunks and axios, without redux query. If you want to use this file, then you should ignore postSlice.js
import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
const postsAdapter = createEntityAdapter({
    // selectId: (state => state.userId), //This line of code is useful to display all post in the app according to their ID's. 
    sortComparer: (a, b) => b.date.localeCompare(a.date)
});

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
    initialState: postsAdapter.getInitialState({ /* posts: [],  */status: "idle", error: null, count: 0 }), //We comment out the "posts" parameter because our initial state will already (even if we didn't put anything in it) return the normalized object where we have an array of the items ids, and then we have the  that entities object that will actually have all the items.
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
            // const existingPost = state.posts.find(post => post.id === postId);
            const existingPost = state.entities[postId];
            if (existingPost) existingPost.reactions[reaction]++;
        },
        increaseCount(state, action) {
            state.count = state.count + 1
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, function (state, action) {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, function (state, action) { //When we get fetchPosts.fulfilled, the "fetchPosts" function is executed first and then return an answer in "action.payload". After that, the rest of the code is executed
                state.status = 'succeeded';
                let min = 1;
                const loadedPosts = action.payload.map(function (post) { // Adding date and reactions
                    post.date = sub(new Date(), { minutes: min++ }).toISOString();
                    post.reactions = { thumbsUp: 0, wow: 0, heart: 0, rocket: 0, coffee: 0 };
                    return post;
                });
                // state.posts = state.posts.concat(loadedPosts);// Add any fetched posts to the array
                postsAdapter.upsertMany(state, loadedPosts)
            })
            .addCase(fetchPosts.rejected, function (state, action) {
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
                // state.posts.push(action.payload);
                postsAdapter.addOne(state, action.payload);
            })
            .addCase(updatePost.fulfilled, function (state, action) {
                if (!action.payload?.id) {
                    console.log('Update could not complete', action.payload);
                    return;
                }
                action.payload.date = new Date().toISOString();
                // const { id } = action.payload;
                // const posts = state.posts.filter(post => post.id !== id);
                // state.posts = [...posts, action.payload];
                postsAdapter.upsertOne(state, action.payload);
            })
            .addCase(deletePost.fulfilled, function (state, action) {
                if (!action.payload?.id) {
                    console.log('Delete could not complete', action.payload);
                    return;
                }
                const { id } = action.payload;
                // state.posts = state.posts.filter(post => post.id !== id);
                postsAdapter.removeOne(state, id)
            })
    }
});

//getSelectors creates these selectors and we rename them with aliases using destructuring so they match up with our existing code.
const { selectAll: selectAllPosts, selectById: selectPostById, selectIds: selectPostIds } = postsAdapter.getSelectors(state => state.posts);
const selectUsersState = (state, userId) => userId;
//const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId);

//function selectAllPosts(state) { return state.posts.posts };
function getPostsStatus(state) { return state.posts.status };
function getPostsError(state) { return state.posts.error };
function getCount(state) { return state.posts.count };

const selectPostsByUser = createSelector(                            //(1)
    [selectAllPosts, selectUsersState],                              //(2)
    (posts, userId) => posts.filter(post => post.userId === userId)  //(3)
);

const postsReducer = postsSlice.reducer;
const postsActions = postsSlice.actions;

export { postsReducer, postsActions, selectAllPosts, selectPostById, selectPostIds, selectPostsByUser, getPostsStatus, getPostsError, getCount, fetchPosts, addNewPost, updatePost, deletePost };

//Steps to uunderstand the use of createSelector
//(1) createSelector is a function that generates memoized selectors that will only recalculate results when the inputs change. It accepts one or more input functions and and they've got to be inside of an array.
//(2) These are input selectors and are simple functions that take the whole state and return a slice of it. They don't perform any computations. If one of the two parameters (in this case, "posts" or "userId")
//    changes essentially, that's the only time that we'll get something new from the selector.
//    "selectAllPosts" is a function that receives the global state of the app and returns the list of all posts. This function is used to get all of the posts from the Redux global state.
//    "selectUsersState" receives two parameters, the global state and the userId. This funcion simply returns the userId that was passed in. This means that this function can access both the global state and an Id.
//    When using createSelector with an array of input selectors, this creates a selector which take the global state and additional arguments, and then passes the results of the input selectors to the output selector
//(3) This is an output selector function (also called "transformation function"). When we call selectPostsByUser(state, userId), createSelector will pass all of the arguments into each of our input selectors.
//    Whatever those input selectors return becomes the arguments for the output selector. If we try calling selectPostsByUser multiple times, it will only re-run the output selector if either posts or userId has changed
// [selectAllPosts, selectUsersState] stands for the input selectors which provide the necessary data to the selector. Then they'll be used in the output selector to get the posts that belong to the specific user.

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