import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({
    reducerPath: 'api', //This is the deffault path, so if we didn't put this here it would be okey because it would just default to that.
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
    tagTypes: ['Todos'],
    endpoints: (builder) => ({
        getTodos: builder.query({ //Only the "get" method use builder.query. The rest of the methods will use builder.mutation due to the fact that they can change the data we're not just requesting or querying the data.
            query: () => '/todos',
            transformResponse: res => res.sort((a, b) => b.id - a.id),
            providesTags: ['Todos']
        }),
        addTodo: builder.mutation({
            query: (todo) => ({ url: '/todos', method: 'POST', body: todo }),
            invalidatesTags: ['Todos']
        }),
        updateTodo: builder.mutation({
            query: (todo) => ({ url: `/todos/${todo.id}`, method: 'PATCH', body: todo }),
            invalidatesTags: ['Todos']
        }),
        deleteTodo: builder.mutation({
            query: (todo) => ({ url: `/todos/${todo.id}`, method: 'DELETE', body: todo.id }),
            invalidatesTags: ['Todos']
        }),
    })
});
const { useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } = apiSlice; //These hooks are auto-generated according to the names in the endpoints.

export { apiSlice, useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation };

//Reason why we need to use "tagTypes"
//The results get cashed and we're not invalidating the previous cache and it's not updating to show the new changes whether that's a delete, update or even a new to-do list or not a new to-do list. It's not
//showing any of that because we're still seeing the cached version of the data. What we need to do is assign a tag to the cache and the let it know which mutations invalidate the cache and so then it will
//automatically refetch that data for us. So we need to add --> tagTypes: ['Todos']. Then, providesTags: ['Todos'] for get methods and invalidatesTags: ['Todos'] for the rest of ones.