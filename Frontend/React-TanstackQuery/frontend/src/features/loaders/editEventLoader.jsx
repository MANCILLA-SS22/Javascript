import { fetchEvent, queryClient } from "../../utils/http";

function editEventLoader({ params }) {
    const id = params.id;

    return queryClient.fetchQuery({ //(1)
        queryKey: ["events", id], //We use "params.id" because this query depends on the ID of the event which we're trying to edit.
        queryFn: function ({ signal }) {
            return fetchEvent({ signal, id: params.id });
        },
    });
};

export {editEventLoader};

//(1)
//We should make sure that you have access to queryClient because now we'll not load data through the useQuery hook (built-in hook in R-R), but instead directly with help of that "queryClient.fetchQuery".
//This can be used to trigger a query programmatically. And with that, we're making sure that this query gets sent.
//Now we just have to return that queryClient so that the editEventLoader loader actually gets a promise that's actually returned by fetchQuery and waits for that promise to resolve before React Router
//goes ahead and renders the component. The reason why we use "fetchQuery".

//We could use "useLoaderData" here to get access to the data that's returned byu the loader, but instead we should use "useQuery" because when we use the "fetchQuery" because when we use fetchQuery here in the
//loader React Query will go ahead and send that request and we'll then store that response data in the cache.
//Therefore, when useQuery is executed AGAIN in the EditEventX2.jsx file, we'll get access to the cached data that we'd already stored in editEventLoader"".

//When you return queryClient.fetchQuery inside the loader function, it indicates that you want to use React Query's built-in mechanism to fetch and cache the data for that query. In this case, you await it 
//because fetching data is typically an asynchronous operation.