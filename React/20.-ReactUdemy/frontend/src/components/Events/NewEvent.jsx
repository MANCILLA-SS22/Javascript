import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { createNewEvent, queryClient } from '../../utils/http.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

function NewEvent(){
  const navigate = useNavigate();
  const {mutate, isPending, isError, error} = useMutation({
    mutationFn: createNewEvent,
    onSuccess: function(){
      queryClient.invalidateQueries({queryKey: ["events"]});
      return navigate("/events"); 
    }
  });

  function handleSubmit(formData) {
    mutate({event: formData});
  }

  function render(){
    if(isPending) return "Submitting...";
    return <>
      <Link to="../" className="button-text"> Cancel </Link>
      <button type="submit" className="button"> Create </button>
    </>
  }

  function renderError(){
    if(isError) return <ErrorBlock title="Failed to create events" message={error.info?.message || "Failed to create events. Please check your inputs and try again leter"}/>
  }

  return (
    <Modal onClose={() => navigate('../')}>
      <EventForm onSubmit={handleSubmit}>
        {render()}
      </EventForm>
    {renderError()}
    </Modal>
  );
}

export default NewEvent;

//useMutation
//We could also send post requests with use Query because after all, you're writing the logic for sending the requests on your own anyways. But this use mutation hook is optimized for such 
//data changing queries, for example, simply by making sure that those requests are not sent instantly when this component renders as it by default is the case with use Query. But that instead 
//requests are only sent when you want to send them, for example, from inside the handleSubmit function.
//We don't necessarily need to do this because the idea with mutations typically isn't to cache their response data because they are primarily about changing something on your backend, not about
//getting and storing data in your fronted.
//And even though the createNewEvent function needs some input data, we don't have to wrap it with an anonymous function.

//{mutate} 
//useMutation also has a mutate property, which is extremely important because this is now a function which you can call anywhere in this component to actually send this request because 
//as mentioned, useMutation, unlike useQuery does not automatically send this request when this component here is rendered but instead only when you tell it to send that request, which you do with 
//help of that mutationFn. And it's of course up there in handleSubmit where we wanna send that request.

//onSuccess
//This function will fire when the mutation is successful and will be passed the mutation's result. If a promise is returned, it will be awaited and resolved before proceeding.


//queryClient.invalidateQueries({})
//It doesn't directly send a request to the backend. It marks the cached data associated with the query key as invalid. When someone tries to fetch that data again, the query client automatically 
//triggers a request to the backend to refresh the data, using the information stored in the query key to construct the request. This will then invalidate all queries that include the "events" key.

//invalidateQueries 
//It allows us to invalidate one or more queries. So that allows us to tell React Query that the data that's connected to some queries is outdated and that it should be refetched.
//It in the end tells React Query that the data fetched by certain queries is outdated now, that it should be marked as stale and that an immediate refetch should be triggered if the Query 
//belongs to a component that's currently visible on the screen. So for example, if I'm creating a new event, of course the page that shows all events is still visible on the screen. 
//It's below this modal after all. So the Query that was responsible for this section here should be reexecuted.
//We could work around that by also setting the exact property on this object that we're passing to invalidate queries to true and now only queries with exactly that key would be invalidated. 
//But since you should build your Query keys such that they kind of describe the data you are fetching, it makes sense to invalidate all queries that include events because all those queries 
//would otherwise be dealing with old data.
//For example, in the findEvents section where I'm looking for events based on a search term entered by the user, I of course don't want to ignore new events that have been added.
//So we wanna invalidate the Query in findEvents as well, so that if a new event was added, that is met by this search term entered by the user it's presented as a result for searchTerm, automatically by React Query.

//This method can be used to invalidate and refetch single or multiple queries in the cache based on their query keys or any other functionally accessible property/state of the query. By default, 
//all matching queries are immediately marked as invalid and active queries are refetched in the background. 
//If you do not want active queries to refetch, and simply be marked as invalid, you can use the refetchType: 'none' option. 
//If you want inactive queries to refetch as well, use the refetchType: 'all' option