import { useRef, useState, useCallback } from 'react';
import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import { fetchUserPlaces, updateUserPlaces } from './components/http.js';
import {useFetch} from './hooks/useFetch.js';

function App() {
  const selectedPlace = useRef();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState();
  const { isFetching,  error,  fetchedData,  setFetchedData } = useFetch(fetchUserPlaces, []); 
  
  const handleRemovePlace = useCallback(async function () {
    setFetchedData((prevPickedPlaces) => prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id));

    try {
      await updateUserPlaces(fetchedData.filter(event => event.id !== selectedPlace.current.id));
    } catch (error) {
      setFetchedData(fetchedData);
      setErrorUpdatingPlaces({ messaje: error.message || "Failed to delete place." })
    }

    setModalIsOpen(false);

  }, [fetchedData, setFetchedData]);

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  function handleError(){
    setErrorUpdatingPlaces(null);
  }

  async function handleSelectPlace(selectedPlace) {
    setFetchedData(function(prevPickedPlaces){
      if (!prevPickedPlaces) prevPickedPlaces = [];

      const verify = prevPickedPlaces.some((place) => place.id === selectedPlace.id);
      if (verify) return prevPickedPlaces;

      return [selectedPlace, ...prevPickedPlaces];
    });

    try {
      await updateUserPlaces([selectedPlace, ...fetchedData]);
    } catch (error) {
      setFetchedData(fetchedData);
      setErrorUpdatingPlaces({message: error.message || "Failed to update places."});
    }
  }

  return (
    <>
      <Modal open={errorUpdatingPlaces} onClose={handleError}>
        {errorUpdatingPlaces && <Error title="An error ocurred!" message={errorUpdatingPlaces.message} onConfirm={handleError} />}
      </Modal>

      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation onCancel={handleStopRemovePlace} onConfirm={handleRemovePlace} />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>Create your personal collection of places you would like to visit or you have visited.</p>
      </header>
      <main>
        {error && <Error title="An error ocurred!" message={error.message} />}
        {!error && <Places title="I'd like to visit ..." fallbackText="Select the places you would like to visit below." isLoading={isFetching} loadingText="Fetching your places..." places={fetchedData} onSelectPlace={handleStartRemovePlace} />}
        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
