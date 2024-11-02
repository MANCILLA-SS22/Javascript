import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({
    reducerPath: 'api', //This is the deffault path, so if we didn't put this here it would be okey because it would just default to that.
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }, { maxRetries: 2 }),
    tagTypes: ['Post', 'User'],
    keepUnusedDataFor: 10,
    endpoints: function (builder){ return {} }
})

export { apiSlice };

//Reason why we need to use "tagTypes"
//The results get cashed and we're not invalidating the previous cache and it's not updating to show the new changes whether that's a delete, update or even a new to-do list or not a new to-do list. It's not
//showing any of that because we're still seeing the cached version of the data. What we need to do is assign a tag to the cache and the let it know which mutations invalidate the cache and so then it will
//automatically refetch that data for us. So we need to add --> tagTypes: ['Todos']. Then, providesTags: ['Todos'] for get methods and invalidatesTags: ['Todos'] for the rest of ones.

//RTK Query exports a utility called retry that you can wrap the baseQuery in your API definition with. It defaults to 5 attempts with a basic exponential backoff.
//baseQuery: retry(fetchBaseQuery({ baseUrl: 'http://localhost:3500' }), { maxRetries: 2 }),