import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { fetchEvent, deleteEvent, queryClient } from '../../utils/http.jsx';
import Header from '../Header.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import Modal from '../UI/Modal.jsx';

function EventDetails(){
  const [isDeleting, setIsDeleting] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;

  const {data, isPending, isError, error} = useQuery({
    queryKey: ["events", id],
    queryFn: function ({ signal }) { return fetchEvent({ id, signal }) } //(2)
  });

  const {mutate, isPending: isPendingDeletion, isError: isErrorDeletion, error: deleteError} = useMutation({
    mutationFn: deleteEvent,
    onSuccess: function(){
      queryClient.invalidateQueries({ queryKey: ["events"], refetchType: "none"  }); 
      return navigate("/events");
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
    const formattedDate = new Date(data.date).toLocaleDateString("en-US", { day: "numeric", month: 'short', year: "numeric" });
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
    mutate({id});
  };

    function handleStartDelete(){
    setIsDeleting(true);
  };

    function handleStopDelete(){
    setIsDeleting(false);
  };

  return <>
    {
      isDeleting && <>
        <Modal>
          <h2>Are you sure?</h2>
          <p>Do you really want to delete this event? This action cannot be undone.</p>
          <div className='form-actions'>
            {isPendingDeletion && <p>Deleting, please wait...</p>}
            {
              !isPendingDeletion && <>
                <button onClick={handleStopDelete} className='button-text'>Cancel</button>
                <button onClick={handleDelete} className='button'>Delete</button>
              </>
            }
          </div>
          {isErrorDeletion && <ErrorBlock title="Failed to delete event" message={deleteError.info?.message || "Failed to delete events. Please try again later."} />}
        </Modal>
      </>   
    }
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