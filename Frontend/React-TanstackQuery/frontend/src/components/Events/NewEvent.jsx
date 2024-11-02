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
  };

  return (
    <Modal onClose={() => navigate('../')}>
      <EventForm onSubmit={handleSubmit}>
        {
          isPending ? "Submitting..." : <>
            <Link to="../" className="button-text"> Cancel </Link>
            <button type="submit" className="button"> Create </button>
          </>
        }
      </EventForm>
      { isError && <ErrorBlock title="Failed to create events" message={error.info?.message || "Failed to create events. Please check your inputs and try again leter"} /> }
    </Modal>
  );
}

export default NewEvent;

//if I'm creating a new event, of course the page that shows all events is still visible on the screen. It's below this modal after all. So the Query that was responsible for this section here should be re-executed.
//We could work around that by also setting the exact property on this object that we're passing to invalidate queries to true and now only queries with exactly that key would be invalidated. 
//But since you should build your Query keys such that they kind of describe the data you are fetching, it makes sense to invalidate all queries that include events because all those queries 
//would otherwise be dealing with old data.
//For example, in the findEvents section where I'm looking for events based on a search term entered by the user, I of course don't want to ignore new events that have been added.
//So we wanna invalidate the Query in findEvents as well, so that if a new event was added, that is met by this search term entered by the user it's presented as a result for searchTerm, automatically by React Query.