import React, { useState, useEffect, useCallback } from 'react';
import AddMovie from './components/AddMovie';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const fetchMoviesHandler = useCallback(async function () {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://reactudemy-5865e-default-rtdb.firebaseio.com/movies.json", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });

      if (!response.ok) throw new Error("Something went wrong!");

      const data = await response.json();
      const loadedMovies = [];
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        });
      };

      setMovies(loadedMovies);

    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }, []);

  function movieContent(){
    let content = <p>Found no movies.</p>;
    if (!isLoading && movies.length > 0)              content = <MoviesList movies={movies} />;
    if (!isLoading && movies.length === 0 && !error)  content = <p>Found no movies.</p>;
    if (!isLoading && error)                          content = <p>{error}</p>;
    if (isLoading)                                    content = <p>Loading...</p>;

    return content
  };

  async function addMovieHandler(movie){
    await fetch("https://reactudemy-5865e-default-rtdb.firebaseio.com/movies.json", {
      method: "POST",
      body: JSON.stringify(movie),
      headers: { "Content-Type": "application/json" }
    });

    const response = await fetch("https://reactudemy-5865e-default-rtdb.firebaseio.com/movies.json", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });

    const data = await response.json();
    const arr = Object.entries(data);
    const lastElement = arr[arr.length - 1];
    const arrToObj = lastElement.reduce((acc, curr, index, src) => {
      if (index % 2 === 0) acc[curr] = src[index + 1];
      return acc;
    }, {}); 

    setMovies(prevState => [...prevState, arrToObj ]);
  }; 

  // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]); 

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={() => fetchMoviesHandler()}>Fetch Movies</button>
      </section>
      <section>
        {movieContent()}
      </section>
    </React.Fragment>
  );
}

export default App;

//useCallback is mostly used when you don't want a function to get un-necessarily created each time on every render and subsequent re-renders of the component. 
//Remember that useCallback will always return the same instance of the function on re-renders unlike normal functions where they are recreated with each re-render of the
//component. The useCallback would refresh only when there is a change in dependencies. The second argument of useCallback refers to the dependencies which would trigger a
//re-initialization of the function defined inside useCallback if those dependencies change.

//If "fetchMoviesHandler" changes, this effect should be re-executed and this function could change if we would be using some external state in here. Every render, this funcion will 
//be executed again and therefore, it'll be a new funcion and the useEffect will also execute every render. That's why we use the useCallback hook.