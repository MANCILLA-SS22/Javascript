import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from './http.js';
import { useFetch } from '../hooks/useFetch.js';

async function fetchSortedPlaces(){
  const places = await fetchAvailablePlaces();
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(function(position){ //We can't use async-await because "getCurrentPosition" doesn't yield a promise
      const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude)
      resolve(sortedPlaces);
    });

  });  
}

export default function AvailablePlaces({ onSelectPlace }) {
  
  const {isFetching, error, fetchedData: availablePlaces} = useFetch(fetchSortedPlaces, []);
  if(error) return <Error title="An error ocurred!" message={error.message} />

  return (
    <Places title="Available Places" places={availablePlaces} fallbackText="No places available." onSelectPlace={onSelectPlace} isLoading={isFetching} loadingText={"Fetching place data..."}/>
  );
}
