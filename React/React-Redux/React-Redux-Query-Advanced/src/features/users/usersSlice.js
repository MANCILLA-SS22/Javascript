import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const usersAdapter = createEntityAdapter();
const initialState = usersAdapter.getInitialState();

const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: function (builder){
        return {
            getUsers: builder.query({
                query: () => '/users',
                transformResponse: function (responseData) {
                    return usersAdapter.setAll(initialState, responseData)
                },
                providesTags: function (result, error, arg) {
                    return [
                        { type: 'User', id: "LIST" },
                        ...result.ids.map(id => ({ type: 'User', id }))
                    ]
                }
            })
        };
    }
});

const { useGetUsersQuery } = usersApiSlice;
const selectUsersResult = usersApiSlice.endpoints.getUsers.select(); // returns the query result object
const selectUsersData = createSelector(selectUsersResult, function (usersResult) { return usersResult.data }); // Creates memoized selector.
const { selectAll: selectAllUsers, selectById: selectUserById, selectIds: selectUserIds } = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState); // Pass in a selector that returns the posts slice of state

export { usersApiSlice, useGetUsersQuery, selectUsersResult, selectUsersData, selectAllUsers, selectUserById, selectUserIds };