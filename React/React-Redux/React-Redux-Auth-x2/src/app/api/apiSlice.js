import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { authActions } from '../../features/auth/authSlice'

const baseQueryObj = fetchBaseQuery({ //This returns a function with the following parameters: async (arg, api) => {...}
    baseUrl: 'http://localhost:3500',
    credentials: 'include', //This will send back our http only secure cookie so you want the cookie to send with every query.
    prepareHeaders: function (headers, { getState }) { //This is because we wanna send ouur access token every time.
        const token = getState().auth.token //Retrieving the Token: The function extracts the token from the auth slice of the state
        if (token) headers.set("authorization", `Bearer ${token}`); //Setting the Authorization Header: If the token exists, the function adds an authorization header to the headers object.
        return headers; //Returning the Headers: Finally, the modified headers object is returned. This ensures that the headers include the authorization header with the token for every request.
    }
});

async function baseQueryWithReauth(args, api) { //(1)
    let result = await baseQueryObj(args, api);
    if (result?.error?.originalStatus === 403) {
        console.log('sending refresh token'); //If the initial request results in a 403 Forbidden error, it tries to refresh the token by making a request to /refresh.
        const refreshResult = await baseQueryObj('/refresh', api); console.log(refreshResult); // send refresh token to get new access token 
        if (refreshResult?.data) { //If the refresh request is successful, it updates the state with the new token and retries the original request
            const user = api.getState().auth.user;
            api.dispatch(authActions.setCredentials({ ...refreshResult.data, user })); // store the new token 
            result = await baseQueryObj(args, api); // retry the original query with new access token 
        };
        api.dispatch(authActions.logOut());  //If token refresh fails, it logs out the user
    }
    return result;
};

const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: function (builder) {
        return {
            login: builder.mutation({
                query: function (credentials) {
                    return { url: '/auth', method: 'POST', body: { ...credentials } }
                }
            }),
            getUsers: builder.query({
                query: () => '/users',
                keepUnusedDataFor: 5,
            })
        }
    }
});

const { useLoginMutation, useGetUsersQuery } = apiSlice;

export { apiSlice, useLoginMutation, useGetUsersQuery }