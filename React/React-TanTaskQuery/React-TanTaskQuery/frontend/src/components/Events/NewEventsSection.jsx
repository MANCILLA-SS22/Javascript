import {useQuery} from "@tanstack/react-query"; //Tanstack Query doesn't come with some built-in logic to send HTTP requests. Instead it comes with logic for managing those requests, for keeping track of the data and the possible errors that are yielded by these requests and so on.
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';
import { fetchEvents } from "../../utils/http.jsx";


export default function NewEventsSection() {
  const {data, isPending, isError, error} = useQuery({ 
    queryKey: ['events', {max: 3}],
    queryFn: function({signal, queryKey}){ //Here, "queryKey" is the value coming from useQuery's key that has the same name. So the values are: 'events', {max: 3}. 
      return fetchEvents({signal, ...queryKey[1]}); // ...queryKey[1] is the same as using "{max: 3}" buy we wanna aboid to duplicate same code.
    },
    staleTime: 5000,
    // gcTime: 30000
  });

  let content;
  if (isPending) content = <LoadingIndicator />;
  if (isError) content = <ErrorBlock title="An error occurred" message={error.info?.message || "Failed to fetch events."} />;
  if (data){
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}

export {};

// 1. useQuery({}): --> This hook will send an HTTP request, get us events data that we need in this section and also give us information about loading state. 
//    So, if we are sending the request and potential errors. The {data} variable will exist on that object returned by useQuery amd will be a property wich holds the actual response
//    data as a value so that, which in the end is returned by our custom fetching function, that data is what will end up in this data property as a value once this Query is done. 
//    But of course it will not be done instantly, instead as a first step, the request must be sent and we must wait for a response. Therefore, this object also contains an isPending 
//    property which tells us whether the request is currently still on its way or if we already get a response. And if we do have a response it must not necessarily be that data here. 
//    Instead, we could also be facing an error if something went wrong on the server for example and therefore useQuery also gives us an isError property on this object here, which 
//    will be true if we gut back an error response. Now to make sure that isError is true, in such a case your code that sends the request also must make sure that an error is thrown
//    if you got an invalid response. 
// 2. queryKey  --> Every query or fetch request we are sending, so every get HTTP request we are sending, also should have such a queryQuey which will then internally be used
//    by tancks-query to cache the data that's yielded by that request so that that response from that request could be used in the future if we're trying to send the same request 
//    again. And we can configure how long data should be stored and reused. This basically will make sure that data can be shown to the user quicker if we already have it because
//    it doesn't need to be refetched all the time. That's why queryKey needs such a key and the key is actually an array of values which are then internally stored by react-query
//    such that whenever we're using a similar array of fimilar values React Query sees that and is able to reuse existing data.

//    Instead, React Query caches the response data you are getting back from your requests and it will reuse that data whenever it encounters a never useQuery execution with the same Query Key. 
//    So for example, if we go back from other page to the one in NewEventsSection and therefore, this component function executes again, React-Query will see that the 'events' QueryKey has been used 
//    before and that it did already cache data for that key. And it will then instantly yield that data, but at the same time, also send the fetchEvents request again Behind the Scenes to see if 
//    updated data is available. And then it will kind of silently replace that data with the updated data so that after a couple of seconds or however long it takes to fetch that data, we do have the 
//    updated data on the screen.

// 3. queryFn   --> With this function we define the actial code that will be executed that wilk send the actual request. It returns a promise
// 4. staleTime --> This controls after which time react-query will send such a behind the scenes request to get updated data if it found data in your cache. 0 means that it will use 
//    data from the cache but it will then always also send such a Behind the Scenes request to get updated data. If you set staleTime to 5,000, for example, it will wait for 5,000 milliseconds.
//    before sending another request.
// 5. gcTime --> This is the Garbage Collection Time. This controls how long the data and the cache will be kept around. And the default here are five minutes. This would mean that the cached data
//    would only be kept for 5 minutes and thereafter, it would be discarded. So thereafter, if this component needs to render again, there would be no cached data, and therefore, React Query 
//    would always need to send a new request to get some data before it can show anything.