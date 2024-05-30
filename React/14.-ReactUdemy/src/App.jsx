import { useCallback, useEffect, useRef, useState } from 'react';
import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import { AVAILABLE_PLACES } from './data.js';
import { sortPlacesByDistance } from './loc.js';

const storedIds =  JSON.parse(localStorage.getItem("selectedPlaces")) || []; //console.log(storedIds);

// const storedPlaces = storedIds.map(id => AVAILABLE_PLACES.find(places => places.id === id)); console.log(storedIds);
const storedPlaces = storedIds.map(function(id){
  return AVAILABLE_PLACES.find(function (places){
    return places.id === id;
  })
});

function App() {
  const selectedPlace = useRef();
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position){
      const sortedPlaces = sortPlacesByDistance(AVAILABLE_PLACES, position.coords.latitude, position.coords.longitude);
      setAvailablePlaces(sortedPlaces);
    })
  }, []);

  function handleStartRemovePlace(id) {
    setModalIsOpen(true);
    selectedPlace.current = id;
  }

  function handleSelectPlace(id) {
    setPickedPlaces(function(prevPickedPlaces){
      if (prevPickedPlaces.some(event => event.id === id)) return prevPickedPlaces;
      const place = AVAILABLE_PLACES.find(event => event.id === id);
      return [...prevPickedPlaces, place];
    });

    const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
    if (storedIds.indexOf(id) === -1) localStorage.setItem("selectedPlaces", JSON.stringify([id, ...storedIds]));
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  const handleRemovePlace = useCallback(function handleRemovePlace(){
    setPickedPlaces(prevPickedPlaces => prevPickedPlaces.filter((place) => place.id !== selectedPlace.current));
    setModalIsOpen(false)

    const storedIds =  JSON.parse(localStorage.getItem("selectedPlaces")) || [];
    localStorage.setItem("selectedPlaces", JSON.stringify(storedIds.filter(id => id !== selectedPlace.current))); //We verify if the id of the value in local storage, is the same as the one that we selected to remove. So, We'll filter out everything different from what we've set up, but if both id's are the same, we'll get "false" and it won't filtered out.
  }, [])
  

  return (
    <>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation onCancel={handleStopRemovePlace} onConfirm={handleRemovePlace}/>
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>Create your personal collection of places you would like to visit or you have visited.</p>
      </header>
      <main>
        <Places title="I'd like to visit ..." places={pickedPlaces} onSelectPlace={handleStartRemovePlace} fallbackText={'Select the places you would like to visit below.'} />
        <Places title="Available Places"      places={availablePlaces} onSelectPlace={handleSelectPlace}   fallbackText={"Sorting places by distance..."} />
      </main>
    </>
  );
}

export default App;

//const handleRemovePlace = useCallback(function handleRemovePlace() {}
//In DeleteConfirmation.jsx, specifically at the useEffect hook, we set up onConfirm(handleRemovePlace) into our dependencies array, but once the app is rendered, we would be
//re-creating the same function over and over again, even though it is the same funcion with the same parameters, values and more. Remember that funcions in JS are simply
//objects, so whenever tha app is re-rendered, we'll get another handleRemovePlace funcion with the same values and parameters, but it'll be different from the previous one.
//And, by doing so, we'll eexecute our useEffect every time the app us rendered again, so that's why we use the useCallback hook, so we can keep this function from re-creating again.