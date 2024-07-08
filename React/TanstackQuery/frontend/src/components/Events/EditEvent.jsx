import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchEvent, queryClient, updateEvent } from '../../utils/http.jsx';
import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
//ongoing query = query en proceso o query en marcha
function EditEvent() {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  const {data, isPending, isError, error} = useQuery({
    queryKey: ["events", id], // Keep in mind that ["events", id] is used both in "EditEvent" and "EventDetails". So the same cashed data is available in both components.
    queryFn: function({signal}){
      return fetchEvent({signal, id});
    },
  });

  //Optimistic Updates (Updating a single data via the cache)
  const {mutate} = useMutation({
    mutationFn: updateEvent,
    onMutate: async function (data) { //data comes from the "mutate" function and it has, in this case, two parameters (id and event).
      await queryClient.cancelQueries({ queryKey: ["events", id] }); //Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      const previousEvent = queryClient.getQueryData([["events", id]]); // Snapshot the previous value
      queryClient.setQueryData(["events", id], data.event);  // Optimistically update to the new value.
      return { previousEvent }; //Return a context object with the snapshotted value. "previousEvent" is being sended to "onErrror" and it'll be used with help of "context"
    },
    onError: function (error, data, context) { //If the mutation fails, use the context returned from onMutate to roll back.     "data" stands for the data which was submitted to the mutationFn
      return queryClient.setQueryData(["events", id], context.previousEvent);
    },
    onSettled: function () {  // Always refetch after error or success
      return queryClient.invalidateQueries(["events", id]);
    }
  });

  function handleSubmit(formData) {
    mutate({id, event: formData});
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
      <div className='form-actions'>
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