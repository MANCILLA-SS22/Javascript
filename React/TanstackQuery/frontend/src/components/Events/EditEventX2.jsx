import { Link, useNavigate, useNavigation, useParams, useSubmit } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchEvent } from '../../utils/http.jsx';
import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
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
        {
          state === "submitting" ? (<p>Sending data...</p>) : <>
            <Link to="../" className="button-text">Cancel</Link>
            <button type="submit" className="button">Update</button>
          </>
        }
      </EventForm>
    )
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
};

export default EditEvent;