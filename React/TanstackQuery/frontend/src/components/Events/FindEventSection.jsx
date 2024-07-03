import { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '../../utils/http';
import LoadingIndicator from '../UI/LoadingIndicator';
import ErrorBlock from '../UI/ErrorBlock';
import EventItem from './EventItem';

function FindEventSection() {
  const searchElement = useRef();
  const [searchTerm, setSearchTerm] = useState();

  const {data, isLoading, isError, error} = useQuery({ 
    queryKey: ["events", {searchTerm: searchTerm}],                             //(1)
    queryFn: ({ signal, queryKey }) => fetchEvents({ signal, ...queryKey[1] }), //(2)
    enabled: searchTerm !== undefined //This is true if the user did enter anything and false otherwise.That's to say, even if we have an empty string, it'll be enabled and the request will be sent. 
  });

  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(searchElement.current.value);
  }

  let content = <p>Please enter a search term and to find events.</p>;
  if(isLoading) content = <LoadingIndicator/>;
  if(isError) content = <ErrorBlock title="An error ocurred!" message={error.info?.message || "Failed to fetch events."}/>;
  if(data) content = (
    <ul className='events-list'>
      {
        data.map(function(event){
          return(
            <li key={event.id}>
              <EventItem event={event}/>
            </li>
          )
        })
      }
    </ul>
  )

  return (
    <section className="content-section" id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input type="search" placeholder="Search events" ref={searchElement} />
          <button>Search</button>
        </form>
      </header>
      {content}
    </section>
  );
}

export default FindEventSection;

//(1)
//This query doesn't have the goal of fetching all events but instead only events that match our searchTerm. If we use the ["events"] queryKey, we would of course be using the same queryKey as in NewEventsSection. 
//So, as a result of using the same key, react-query would use the result from the first query in the NewEventsSection component in the FindEventSection component because the results are cashed, they're available 
//and therefore they would be used in useQuery. But that of course would be wrong because that would typically be too many results because we're searching for something that should only yield a couple of results, 
//not all of them. So we need a different queryKey here so that this query works independently from the query in NewEventsSection (data in NewEventsSection wouldn't be reused in FindEventSection 
//because we're using different queryKey's). And the results from the query in the NewEventsSection component are not used as results for the query in FindEventSection component. (Remember that we're using "events"
//because we're still fetching some event data).
//The second element should be dynamic because it should be that searchTerm for which we're looking. An element for which we're executing this query because when this FindEventSection component is rendered for 
//different searchTerm's. So for different events, we of course wanna fetch different data for different events. We need different keys so that we're not caching and reusing the same data for the same single 
//event all the time. By construction a query key dinamically, react query can cache (and reuse) different data for different keys based on the same query. 
//To sum up, the queryKey in this component will work as a filter method and we'll get only the needed event section. 

//It's important to mention that "searchElement.current.value" in searchTerm: "" isn't ideal because refs, unlike state in React don't cause this component function to re-execute which means that as the value 
//entered into this input here changes, this query is not updated and not sent again. But of course we would wanna send it again to get new data if the user did enter a different search term. So that's why we 
//must use useState. By doing so, we'll be able to use the searchTerm state both in queryKey and queryFn to make sure that both fetchEvents as well as the queryKey are updated dynamically and lead to different 
//queries being sent as this searchTerm changes.

//(2)
//We must control how this will be called to make sure that the searchTerm that was entered in the input is forwarded to fetchEvents. To do so, we can actually wrap the queryFn in an anonimus function and 
//then pass the value that was entered into the input, to fetchEvents. If we do this, we'll have to make sure that the query is not send before we do have a search term.