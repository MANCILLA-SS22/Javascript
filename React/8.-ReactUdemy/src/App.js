import React, { useState, useEffect, useCallback } from 'react';
import AddMovie from './components/AddMovie';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //useCallback is mostly used when you don't want a function to get un-necessarily created each time on every render and subsequent re-renders of the component. 
  //Remember that useCallback will always return the same instance of the function on re-renders unlike normal functions where they are recreated with each re-render of the 
  //component. The useCallback would refresh only when there is a change in dependencies. The second argument of useCallback refers to the dependencies which would trigger a 
  //re-initialization of the function defined inside useCallback if those dependencies change.
  const fetchMoviesHandler = useCallback(async function(){
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://reactudemy-5865e-default-rtdb.firebaseio.com/movies.json");
      if(!response.ok){
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const loadedMovies = [];
      for(const key in data){
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        })
      }

      // const transformedMovies = data.results.map(function(movieData){
      //   return{
      //     id: movieData.episode_id,
      //     title: movieData.title,
      //     openingText: movieData.opening_crawl,
      //     releaseDate: movieData.release_date
      //   }
      // });
      
      setMovies(loadedMovies);

    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }, [])

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]); 
  //If this funcion changes, this effect should be re-executed and this function could change if we would be using some external state in here. Every render, this funcion will 
  //be executed again and therefore, it'll be a new funcion and the useEffect will also execute every render. That's why we use the useCallback hook.


  let content = <p>Found no movies.</p>;
  if(!isLoading && movies.length > 0)               content = <MoviesList movies={movies} />;
  if(!isLoading && movies.length === 0 && !error)   content = <p>Found no movies.</p>;
  if(!isLoading && error)                           content = <p>{error}</p>;
  if(isLoading)                                     content = <p>Loading...</p>;


  async function addMovieHandler(movie){
    const response = await fetch("https://reactudemy-5865e-default-rtdb.firebaseio.com/movies.json", {
      method: "POST",
      body: JSON.stringify(movie),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    console.log(data);
  }; 
  

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;    //ñ




/* instead of {content}, we can use:  
{!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
{!isLoading && movies.length === 0 && !error && <p>Found no movies.</p>}
{!isLoading && error && <p>{error}</p>}
{isLoading && <p>Loading...</p>} */

/* //Metodo con .then() y catch()
  function fetchMoviesHandler(){
    fetch("https://swapi.dev/api/films")
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      const transformedMovies = data.results.map(function(movieData){
        return{
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        }
      });

      setMovies(transformedMovies);
    })
    .catch()
  } */
