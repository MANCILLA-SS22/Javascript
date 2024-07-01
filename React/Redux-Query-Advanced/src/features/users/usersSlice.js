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

const selectUsersResult = usersApiSlice.endpoints.getUsers.select();
const selectUsersResultData = (usersResult) => usersResult.data;
const selectUsersData = createSelector(selectUsersResult, selectUsersResultData);
const { selectAll: selectAllUsers, selectById: selectUserById, selectIds: selectUserIds } = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState);

export const { useGetUsersQuery } = usersApiSlice;
export { usersApiSlice, selectUsersResult, selectAllUsers, selectUserById, selectUserIds };