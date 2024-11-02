import { apiSlice } from "../../app/apiSlice"

const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users',
            keepUnusedDataFor: 5,
        })
    })
})

const { useGetUsersQuery } = usersApiSlice;

export { usersApiSlice, useGetUsersQuery }