import { Link, redirect, useNavigate, useNavigation, useParams, useSubmit } from 'react-router-dom';
import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useQuery } from '@tanstack/react-query';
import { fetchEvent, queryClient, updateEvent } from '../../utils/http.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

function EditEvent() {
  const navigate = useNavigate();
  const submit = useSubmit();
  const {state} = useNavigation()
  const params = useParams();

  const {data, isError, error} = useQuery({
    queryKey: ["events", params.id], //We use "params.id" because this query depends on the ID of the event which we're trying to edit.
    queryFn: function({signal}){
      return fetchEvent({signal, id: params.id});
    },
    staleTime: 10000
  });

  function handleSubmit(formData) {
    submit(formData, {method: "PUT"});
  }

  function handleClose() {
    navigate('../');
  }

  let content; 
  if(isError){
    content = <>
      <ErrorBlock title="Failed to load event" message={error.info?.message || "Failed to load events. Please try again later."}/>
      <div>
        <Link to="../" className='button'>Okay</Link>
      </div>
    </>
  }

  if(data){
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        {state === "submitting" ? (<p>Sending data...</p>) : <>
            <Link to="../" className="button-text">Cancel</Link>
            <button type="submit" className="button">Update</button>
          </>
        }
      </EventForm>
    )
  }

  return (
    <Modal onClose={handleClose}>{content}</Modal>
  );
}

//We can then use this function to tell React Router to execute the code in this function before it actually loads and renders the EditEvent component.
function editEventLoader({params}){
  return queryClient.fetchQuery({
    queryKey: ["events", params.id], //We use "params.id" because this query depends on the ID of the event which we're trying to edit.
    queryFn: function({signal}){
      return fetchEvent({signal, id: params.id});
    },    
  })
}

async function editEventAction({request, params}){
  const formData = await request.formData();
  const updatedEventData = Object.fromEntries(formData);
  await updateEvent({ id: params.id, event: updatedEventData });

  //We should use the query client to invalidate all queries to make sure that the updated data is fetched again.
  //Here I'm just making sure that I invalidate the queries that are affected by this update. For example, all event related queries because all those queries of course are affected by the fact that 
  //we did update some data here.
  await queryClient.invalidateQueries(['events']); 

  return redirect('../');

}

export {EditEvent, editEventLoader, editEventAction};

//queryClient.fetchQuery
//We should make sure that you have access to the query client because now we'll not load data through the useQuery hook, but instead since we're outside of a component function, directly with 
//help of that queryClient. And, "fetchQuery" can be used to trigger a query programmatically. So, do it ourself without using the useQuery hook. And with that, we're making sure that this query gets sent.
//Now we just have to return that queryClient so that the editEventLoader loader actually gets a promise that's actually returned by fetchQuery and waits for that promise to resolve before React Router 
//goes ahead and renders the component.

//We could now, for example, think that we should now remove useQuery from that component because we're using React Router now. But this is actually not the case, because whilst you could use 
//useLoaderData, a hook provided by React Router, to get access to the data that's returned by the loader, it is better to keep useQuery around. Because when we use fetchQuery here in the loader
//React Query will go ahead and send that request and we'll then store that response data in the cache. Now, when useQuery is executed again here in the EditEvent it's this cached data that will be used.
//So that for example, if we tab out of this window and come back to it later, it triggers a behind the scenes fetch to look for updated data.