import { apiSlice } from "../app/apiSlice";

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth',
                method: 'POST',
                body: { ...credentials }
            })
        }),
    })
})

const { useLoginMutation } = authApiSlice;

export { authApiSlice, useLoginMutation }