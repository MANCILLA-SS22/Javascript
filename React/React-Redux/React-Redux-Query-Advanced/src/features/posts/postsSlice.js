import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { sub } from 'date-fns';
import { apiSlice } from "../api/apiSlice";
import { useSelector } from "react-redux";

const postsAdapter = createEntityAdapter({ sortComparer: (a, b) => b.date.localeCompare(a.date) });
const initialState = postsAdapter.getInitialState();

const extendedApiSlice = apiSlice.injectEndpoints({ //(1)
    endpoints: function (builder) {
        return {
            getPosts: builder.query({//(0)
                query: () => '/posts',
                transformResponse: function (responseData) { //(2)
                    let min = 1;
                    const loadedPosts = responseData.map(function (post){
                        if (!post?.date) post.date = sub(new Date(), { minutes: min++ }).toISOString();
                        if (!post?.reactions) post.reactions = { thumbsUp: 0, wow: 0, heart: 0, rocket: 0, coffee: 0 }
                        return post;
                    });
                    return postsAdapter.setAll(initialState, loadedPosts); ///(3)
                },
                providesTags: function(result, error, arg){
                    return [ //(8)
                        { type: 'Post', id: "LIST" },
                        ...result.ids.map(id => ({ type: 'Post', id: id }))
                    ]
                }
            }),
            getPostsByUserId: builder.query({
                query: (id) => `/posts/?userId=${id}`,
                transformResponse: function (responseData){
                    let min = 1;
                    const loadedPosts = responseData.map(function (post){
                        if (!post?.date) post.date = sub(new Date(), { minutes: min++ }).toISOString();
                        if (!post?.reactions) post.reactions = { thumbsUp: 0, wow: 0, heart: 0, rocket: 0, coffee: 0 }
                        return post;
                    });
                    return postsAdapter.setAll(initialState, loadedPosts); //(4)
                },
                providesTags: function(result, error, arg){
                    return [
                        //Si ocurre una mutación (por ejemplo, actualización de un post), y esa mutación invalida el tag correspondiente ({ type: 'Post', id: <postId> }), RTK Query sabe que necesita refetchear ese post específico.
                        ...result.ids.map(id => ({ type: 'Post', id: id })) 
                    ]
                }
            }),
            addNewPost: builder.mutation({
                query: function (initialPost){
                    return {
                        url: '/posts',
                        method: 'POST',
                        body: {
                            ...initialPost,
                            userId: Number(initialPost.userId),
                            date: new Date().toISOString(),
                            reactions: { thumbsUp: 0, wow: 0, heart: 0, rocket: 0, coffee: 0 }
                        }
                    }
                },
                invalidatesTags: [ //Here we use invalidatesTags because this is going to invalidate the list. There's no individual post because this post didn't already exist. But it would be part of the list so this should invalidate the post list cache
                    { type: 'Post', id: "LIST" }
                ]
            }),
            updatePost: builder.mutation({
                query: function (initialPost){
                    return {
                        url: `/posts/${initialPost.id}`,
                        method: 'PUT',
                        body: {
                            ...initialPost,
                            date: new Date().toISOString()
                        }
                    }
                },
                invalidatesTags: function (result, error, arg) { //"arg" means the initial post
                    console.log(arg)
                    return [
                        { type: 'Post', id: arg.id }
                    ]
                }
            }),
            deletePost: builder.mutation({
                query: function({ id }){
                    return {
                        url: `/posts/${id}`,
                        method: 'DELETE',
                        body: { id }
                    }
                },
                invalidatesTags: function(result, error, arg){
                    console.log(arg)
                    return [
                        { type: 'Post', id: arg.id }
                    ]
                }
            }),
            addReaction: builder.mutation({
                query: function({ postId, reactions }){
                    return {
                        url: `posts/${postId}`,
                        method: 'PATCH',
                        body: { reactions } // In a real app, we'd probably need to base this on user ID somehow so that a user can't do the same reaction more than once
                    }
                },
                async onQueryStarted({ postId, reactions }, { dispatch, queryFulfilled }) {
                    const patchResult = dispatch(
                        extendedApiSlice.util.updateQueryData('getPosts', undefined, function (draft){// `updateQueryData` requires the endpoint name and cache key arguments, so it knows which piece of cache state to update
                            const post = draft.entities[postId]; // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
                            if (post) post.reactions = reactions;
                        })
                    );
                    try {
                        await queryFulfilled;
                    } catch {
                        patchResult.undo();
                    }
                }
            })
        }
    }
});

const { useGetPostsQuery, useGetPostsByUserIdQuery, useAddNewPostMutation, useUpdatePostMutation, useDeletePostMutation, useAddReactionMutation } = extendedApiSlice;
const selectPostsData = createSelector(           //(6)
    extendedApiSlice.endpoints.getPosts.select(), //(5)
    (postsResult) => postsResult.data || []
); 

const { selectAll: selectAllPosts, selectById: selectPostById, selectIds: selectPostIds } = postsAdapter.getSelectors(state => selectPostsData(state) ?? initialState); //(7)

export { extendedApiSlice, selectPostsData, useGetPostsQuery, useGetPostsByUserIdQuery, useAddNewPostMutation, useUpdatePostMutation, useDeletePostMutation, useAddReactionMutation, selectAllPosts, selectPostById, selectPostIds };

//(0) Only the "get" method use builder.query. The rest of the methods will use builder.mutation due to the fact that they can change the data we're not just requesting or querying the data.

//(1) injectEndpoints accepts a collection of endpoints, as well as an optional overrideExisting parameter. Calling injectEndpoints will inject the endpoints into the original API, but also give you that
//    same API with correct types for these endpoints back. (Unfortunately, it cannot modify the types for the original definition.)

//(2) "transformResponse" allows you to modify or process the response data before it is stored in the Redux state.

//(3) We need to normalize our statem, so we need to send this new state to the post adapter, and we do that with "setAll", which allows you to replace all the entities in the state with a new set of
//    entities, effectively resetting the collection. This can be particularly useful when you need to update the state with a new list of items, such as when fetching data from an API.

//(4) Here, "setAll" doesn't overwrite the cache state of the request for the full list of posts because redux is subscribing to these different queries. Now, this will have a cache state for this
//    specific query as well. And again, with "postAdapter" we're normalizating the state, so it'll also be normalized with an ids array and then having each post inside of the entities object.

//(5) It returns the query result object. This doesn't issue the query, it returns the result object that we already have from the query. "endpoints" is an object, "getPost()" refers to the method and
//    "select()" allow us to get the result object, but that is the entire result object, it's nost just the data. "postsResult.data" is the normalized state object with ids and entities.

//(6) Creates memoized selector. "createSelector" accepts input functions and then has output functions. Our output (selectPostResultData) is taking that result from the input function (selectPostsResult)
//    and then just looking at the data property. And that ".data" property holds our normalized state object that has the ids array and then the entities as well.

//(7) We pass in a selector that returns the posts slice of state. Then, we use "selectPostsData" to say where the state is and it returns our normalized state. Not that it could be null espeically the
//    first time the app loads. To solve this, we use nulish operator (&&). So, if it's null, then it'll return what's on the right side.
//    Remember that "getSelectors" creates default selectors like selectAll, selectById and selectIds.

//(8) The provided code snippet is used within Redux Toolkit, specifically in the context of RTK Query, to manage caching and automatic re-fetching of data. providesTags is an option used in an endpoint definition
//    to specify which tags (or cache keys) should be associated with the data returned by a query. This helps RTK Query to intelligently manage cache invalidation.
//      > Tag for List { type: 'Post', id: "LIST" };
//        This line adds a static tag with the type 'Post' and the id 'LIST'. This tag can be used to invalidate or re - fetch the entire list of posts.
//      > Tags for Individual Items  --> ...result.ids.map(id => ({ type: 'Post', id: id }));
//        This line spreads the array returned by result.ids.map. result.ids is assumed to be an array of identifiers for individual posts.
//        The map function creates a tag for each post with the type 'Post' and the respective id. This allows for granular cache invalidation and re - fetching of individual posts.
//"id" se utiliza para identificar específicamente qué conjunto de datos o entidad se debe invalidar en la cache. Es un concepto clave para gestionar eficientemente la invalidación de datos en RTK Query,
//permitiendo una actualización precisa y controlada del estado de la aplicación. Es una forma de etiquetar de manera única un grupo de datos o una entidad específica en el cache. En este caso, 'LIST' es un
//identificador simbólico que se utiliza para representar la lista de posts (El conjunto de ambos es "posts-LIST"). Esto permite que RTK Query sepa exactamente qué parte del cache debe invalidarse y refetcharse.
//  > Usar id: 'LIST' indica que la invalidación afecta específicamente a la lista completa de publicaciones, no a una publicación individual.
//  > Permite diferenciar entre invalidar una entidad individual(como un solo post) y un grupo de entidades(como una lista de posts).
//  > Al usar IDs específicos como 'LIST', se evita la confusión sobre qué datos deben invalidarse y refetcharse.

//(9) This is an object passed to the invalidatesTags function as a parameter. arg.id is accessing the id property of the arg object.
//    The mentioned object, in this case, contains the data coming from EditPostFor.js, which is the following line of code --> await updatePost({ id: post.id, title, body: content, userId }).unwrap();
//    Therefore, arg.id helps in specifying the particular resource (post in this case) whose cache should be invalidated.