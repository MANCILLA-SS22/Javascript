import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchEvent, queryClient, updateEvent } from '../../utils/http.jsx';
import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

function EditEvent() {
  const navigate = useNavigate();
  const params = useParams();

  const {data, isPending, isError, error} = useQuery({
    queryKey: ["events", params.id], //We use "params.id" because this query depends on the ID of the event which we're trying to edit.
    queryFn: function({signal}){ return fetchEvent({signal, id: params.id}) },
  });

  const {mutate} = useMutation({ //We can extract the "mutate" function out of this object so that we can call it (mutate) to trigger the updateEvent function.
    mutationFn: updateEvent,
    onMutate: async function(data){
      await queryClient.cancelQueries({queryKey: ["events", params.id]});
      const previousEvent = queryClient.getQueryData([["events", params.id]]);
      queryClient.setQueryData(["events", params.id], data.event);
      return {previousEvent}
    },
    onError: function(error, data, context){ return queryClient.setQueryData(["events", params.id], context.previousEvent) },
    onSettled: function(){ return queryClient.invalidateQueries(["events", params.id]) }
  })

  function handleSubmit(formData) {
    mutate({id: params.id, event: formData});
    navigate("../");
  }

  function handleClose() {
    navigate('../');
  }

  let content; 
  if(isPending){
    content = (
      <div>
        <LoadingIndicator/>
      </div>
    )
  }

  if(isError){
    content = <>
      <ErrorBlock title="Failed to load event" message={error.info?.message || "Failed to load events. Please try again later."}/>
      <div>
        <Link to="../" className='button'>Okay</Link>
      </div>
    </>
  }

  if(data){
    content = <>
      <EventForm inputData={data} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">Cancel</Link>
        <button type="submit" className="button">Update</button>
      </EventForm>
    </>
  }

  return <Modal onClose={handleClose}>{content}</Modal>
}

export default EditEvent;

//onMutate: function(){}
//This function here, will be executed right when you call "mutate". So before this process is done, before you got back a response. And it's here in on mutate where I essentially wanna update the data 
//that's cached by React Query where we wanna update the detail data that's stored behind the scenes, so to say. 
//And this can be done by importing queryClient from http.js because through queryClient we can essentially interact with React Query and tell it to invalidate queries or to change the cached data.
//We should start by getting the currently stored data so that we can then manipulate and edit it.

//1.- We use queryClient.setQueryData() to manipulate that already stored data without waiting for a response. 
//    By doing this, we can manipulate that already stored data without waiting for a response. Normally it's manipulated by React Query whenever you got a new response that's being cached.
//    Normally it's manipulated by React Query whenever you got a new response that's being cached.
//    Now, setQueryData then needs two arguments. And the first argument is the key of the query that you do want to edit. In this case it's "events" and "params.i"d because it was a specific event that 
//    we edited it. It is therefore the data that's stored for that event by React-Query which we wanna manipulate here without waiting for the response.
//    The second argument is the new data we wanna store under the query key. So, in this EditEvent component, that would simply be the data (event: formData), which we also sent to our backend.
//    React Query actually passes the data, which you passed to mutate, as a value to onMutate. So we automatically get that data which we did submit to the backend as input in the function in onMutate.
//    Now that data, which we did submit, had an ID property and then the updated event.
//    "data.event" is the updated data from handleSubmit, which is "event: formData". So that's the new data we wanna set for ["events", params.id] in "queryClient.setQueryData". 
//    So this will manipulate the data behind the scenes without waiting for a response.
//2.- The second step is to use queryClient.cancelQueries() to cancel all active queries for a specific key by passing an object to cancel queries, and then setting a query key for which you want to 
//    cancel queries. And in our case, it's that same query key. With this line of code we're making sure that if we had any outgoing queries for that key, those queries would be canceled and we would 
//    not have clashing response data from those queries and our optimistically updated query data because if those ongoing queries finished before the updating request was done, we would've fetched 
//    old data again and we don't wanna do that. So with that, we're canceling ongoing queries for this data and we're setting our own data (in queryClient.setQueryData).
//    "cancelQueries" will not cancel the mutation it will really only cancel queries triggered with use query.
//3.- We would need to use the last method which is queryClient.getQueryData(). Remember that the updating process on the backend could fail and in that case, we would now have outdated data in any 
//    modified data in the inputs. For example, if we delete the entire title, now it's updated in the frontend, but if we reload it's actually back because our backend code blocks this, the backend code 
//    does require an input for every field actually. So we wanna make sure that we roll back our optimistic update if it does fail on the backend.
//    So to make sure that we can roll back, we also need to get the old data and store that old data somewhere so that we can roll back to that old data. And we should do that before we update the data. 
//    Now, queryClient also has a solution for that. It also has a getQueryData method which gives us the currently stored query data, which we of course want to execute before we set it to some new data.
//    Now get query data simply wants the key of the query for which we want to get the data. And with that here we get my previous event. So the old event data. That's what I get with get query data. 
//    And now we wanna roll back to that event if our update mutation failed.

//onError
//It's also wants a function which will be executed if this update mutation errors, so if it fails. It receives a couple of inputs that are passed in automatically by React Query. It receives the 
//error object with which it failed, the data which was submitted to the mutationFn, and a context object that must come from onMutate, it's especifically the object that we get from "return".
//Now, if we try to remove the title again, we'll see that it doesn't work yet. It very briefly went to a state without a title but it's almost impossible to see because it's so fast. But it essentially 
//reinserts the title. To fix that we'll have ot use the next parameter.

//onSettled
//It will simply be called whenever "mutationFn: updateEvent" is done, no matter if it failed or succeeded. 
//And in that case, just to be sure that you really got the same data in your front end as you have on your backend. You should also, again use queryClient.invalidateQueries to invalidate our queries.
//And with this line and that property added in there we simply make sure that whenever this mutation finished, even though we did perform this optimistic updating and we rolled back if things went wrong, 
//we still make sure that you fetched the latest data from the backend so that if the backend did something different and the data would be out of sync between backend and front end right now it gets 
//back into sync by forcing React Query to refetch the data behind the scenes.