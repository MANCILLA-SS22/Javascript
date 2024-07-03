import { redirect } from "react-router-dom";
import { queryClient, updateEvent } from "../../utils/http";

async function editEventAction({ request, params }) {
    const formData = await request.formData();
    const updatedEventData = Object.fromEntries(formData);
    await updateEvent({ id: params.id, event: updatedEventData });
    await queryClient.invalidateQueries(['events']); //(1)
    return redirect('../');
};

export {editEventAction};

//(1)
//We should use the query client to invalidate all queries to make sure that the updated data is fetched again. Here I'm just making sure that I invalidate the queries that are affected by this update. 
//For example, all event related queries because all those queries of course are affected by the fact that we did update some data here.