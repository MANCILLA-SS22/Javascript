import { fetchEvent, queryClient } from "../../utils/http";

function editEventLoader({ params }) {
    return queryClient.fetchQuery({ //(1)
        queryKey: ["events", params.id], //We use "params.id" because this query depends on the ID of the event which we're trying to edit.
        queryFn: function ({ signal }) {
            return fetchEvent({ signal, id: params.id });
        },
    });
};

export {editEventLoader};

//(1)
//We should make sure that you have access to the query client because now we'll not load data through the useQuery hook, but instead since we're outside of a component function, directly with
//help of that queryClient. And, "fetchQuery" can be used to trigger a query programmatically. So, do it ourself without using the useQuery hook. And with that, we're making sure that this query gets sent.
//Now we just have to return that queryClient so that the editEventLoader loader actually gets a promise that's actually returned by fetchQuery and waits for that promise to resolve before React Router
//goes ahead and renders the component.

//We could now, for example, think that we should now remove useQuery from that component because we're using React Router now. But this is actually not the case, because whilst you could use
//useLoaderData, a hook provided by React Router, to get access to the data that's returned by the loader, it is better to keep useQuery around. Because when we use fetchQuery here in the loader
//React Query will go ahead and send that request and we'll then store that response data in the cache. Now, when useQuery is executed again here in the EditEvent it's this cached data that will be used.
//So that for example, if we tab out of this window and come back to it later, it triggers a behind the scenes fetch to look for updated data.