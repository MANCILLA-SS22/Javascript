import { useState } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchEvent, deleteEvent, queryClient } from '../../utils/http.jsx';
import Header from '../Header.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import Modal from '../UI/Modal.jsx';

function EventDetails(){
  const [isDeleting, setIsDeleting] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const {data, isPending, isError, error} = useQuery({
    queryKey: ["events", params.id],
    queryFn: function({signal}){
      return fetchEvent({id: params.id, signal: signal}) 
    }
  });

  const {mutate, isPending: isPendingDeletion, isError: isErrorDeletion, error: deleteError} = useMutation({ //"mutate" is a function we can call to trigger this mutation function.
    mutationFn: deleteEvent,
    onSuccess: function(){
      queryClient.invalidateQueries({
        queryKey: ["events"], 
        refetchType: "none" 
      }); 
      return navigate("/events")
    }
  });

  let content;
  if(isPending){
    content = (
      <div id="event-details-content" className='center'>
        <p>Fetching event data...</p>
      </div>
    )
  }

  if(isError){
    content = (
      <div id="event-details-content" className='center'>
        <ErrorBlock title="Failed to load event" message={error.info?.message || "Failed to fetch events data. Please try again later."} />;
      </div>
    )    
  }

  if(data){
    const formattedDate = new Date(data.date).toLocaleDateString("en-US", {
      day: "numeric",
      month: 'short',
      year: "numeric"
    })
    content = <>
      <header>
          <h1>{data.title}</h1>
          <nav>
            <button onClick={handleStartDelete}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
      <div id="event-details-content">
        <img src={`http://localhost:3000/${data.image}`} alt={data.title} />
        <div id="event-details-info">
          <div>
            <p id="event-details-location">{data.location}</p>
            <time dateTime={`Todo-DateT$Todo-Time`}>{formattedDate} @ {data.time}</time>
          </div>
          <p id="event-details-description">{data.description}</p>
        </div>
      </div>
    </>
  }

  function handleDelete(){
    mutate({id: params.id});
  }

    function handleStartDelete(){
    setIsDeleting(true)
  }  

    function handleStopDelete(){
    setIsDeleting(false)
  }

  function render(){
    if(isDeleting){
      return <>
        <Modal>
          <h2>Are you sure?</h2>
          <p>Do you really want to delete this event? This action cannot be undone.</p>
          <div className='form-actions'>
            {isPendingDeletion && <p>Deleting, please wait...</p>}
            {!isPendingDeletion && <>
                <button onClick={handleStopDelete} className='button-text'>Cancel</button>
                <button onClick={handleDelete} className='button'>Delete</button>
              </>
            }
          </div>
          {isErrorDeletion && <ErrorBlock title="Failed to delete event" message={deleteError.info?.message || "Failed to delete events. Please try again later."}/>}
        </Modal>
      </>      
    }
  }

  return <>
    {render()}
    <Outlet />
    <Header>
      <Link to="/events" className="nav-item"> View all Events </Link>
    </Header>
    <article id="event-details">
      {content}
    </article>
  </>
}

export default EventDetails;

//queryKey
//We want to have an identifier that starts with "events" as a first element in this key array because we're still fetching some event data.
//The second element should be the actual ID for which we're executing this query because when this EventDetails component is rendered for different IDs, so for different events, We of course wanna 
//fetch different data for different events. So we need different keys so that we're not caching and reusing the same data for the same single event all the time.

//queryFn
//remember that "signal" is provided bu react-query and the "id" will be available in the EventDetails component because it is loaded through react-router.



//useMutation()
//Here we of course have a mutation because we're not fetching or getting any data, instead we're sending a DELETE request. We are trying to change, to mutate, data on the backend. Hence we now also
//need useMutation from React Query.

//queryClient.invalidateQueries
//We also wanna invalidate our queries, our event related queries, because since we deleted an event of course, all that data should be marked as outdated and React Query should be forced to fetch data again.

//queryKey:
//I set the queryKey of the query that should be invalidated to just events. So to an array that contains a single string that says events, because all event related queries should be invalidated because 
//they're all affected by the fact that an event has been deleted.

//refetchType: "none"
//After deleting an event, we invalidated all event related queries. We still were on that page. And therefore, technically, since we invalidated all queries. React Query went ahead and immediately 
//triggered a refetch for the details query here.
//Here, you can set the re fetch type to none, which makes sure that when you call invalidate queries, these existing queries will not automatically be triggered again immediately. 
//Instead, they will just be invalidated and the next time they are required, they will run again. But they will not be re-triggered immediately which otherwise would be the default behavior.