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
    queryKey: ["events", {searchTerm: searchTerm}], 
    queryFn: function ({signal, queryKey}){
      return fetchEvents({signal, ...queryKey[1]});
    },
    enabled: searchTerm !== undefined
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
              <EventItem event ={event}/>
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

//queryKey
//This query doesn't have the coal of fetching all events but instead only events that match our search term.
//If we use the ["events"] queryKey, we would of course be using the same queryKey as in NewEventsSection. So, as a result of using the same key, react-query would use 
//the result from the first query in the NewEventsSection component in that other query in FindEventSection component because the results are cashed, they're available 
//and therefore they would be used here. But that of course would be wrong because that would typically be too many results because typically we're searching for something 
//that should only yield a couple of results, not all of them. So we need a different queryKey here so that this query works independently from this query. And the results
//from this query in the NewEventsSection component are not used as results for this query in the FindEventSection component. Therefore here we should also include some 
//other piece of information in that queryKey. And that other piece of information should be dynamic because it should be that search term for which we're looking.
//It's important to mention that "searchElement.current.value" in search: "" isn't ideal because refs, unlike state in React don't cause this component function to 
//re-execute which means that as the value entered into this input here changes, this query is not updated and not sent again. But of course we would wanna send it again 
//to get new data if the user did enter a different search term. So that's why we must use useState. And our goal in handleSubmit is now to call setSearchTerm and to pass the 
//searchElement value as a value to this state updating function so that my searchTerm is the value entered in this input field, but only after the form was submitted.
//And now we can use the searchTerm state bothj in queryKey and queryFn to make sure that both fetchEvents as well as the queryKey are updated dynamically and lead to different 
//queries being sent as this searchTerm changes.

//queryFn
//We must control how this will be called to make sure that whis search term that was entered in the input is forwarded to fetchEvents. To do so, we can actually weap 
//this in an anonimus function and then pass the value that was entered into the input, to fetchEvents. If we do this, we'll have to make sure that the query is not send 
//before we do have a search term. 

//enabled
//Set this to false to disable this query from automatically running.

//isPending 
//A derived boolean from the status variable above, provided for convenience.
//The difference between is loading and is pending is that is loading will not be true if this Query is just disabled.