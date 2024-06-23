import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { authActions } from '../features/authSlice';

const setCredentials = authActions.setCredentials;
const logOut = authActions.logOut;

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
    if (result?.error?.originalStatus === 403) { console.log('sending refresh token'); //If the initial request results in a 403 Forbidden error, it tries to refresh the token by making a request to /refresh.
        const refreshResult = await baseQueryObj('/refresh', api); console.log(refreshResult); // send refresh token to get new access token 
        if (refreshResult?.data) { //If the refresh request is successful, it updates the state with the new token and retries the original request
            const user = api.getState().auth.user;
            api.dispatch(setCredentials({ ...refreshResult.data, user })); // store the new token 
            result = await baseQueryObj(args, api); // retry the original query with new access token 
        };
        api.dispatch(logOut());  //If token refresh fails, it logs out the user
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


//"headers": An instance of Headers that you can modify.
//"getState": A function that returns the current Redux state, allowing you to access any part of the state to determine how to modify the headers.

//(1) A function to handle API requests with token reauthentication. The arguments are: "args" (the request arguments) and "api" (an object providing access to Redux state and dispatch)
//    We use this custom query function if it fails we can reattempt after sending the refresh token and getting a new access token. 
//    So maybe our access token has expired but we have a current refresh token that will allow us to get a new one. Now we could say here if you wanna handle other status code, you can to. 
//    Our backend API is gonna send a 403 forbidden if we send an access token that would have been valid but it's expired. Otherwise it's gonna send a 401 which is unauthorized. 
