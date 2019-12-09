import React, { useState, useEffect } from 'react';
import '../App.css';
import Header from './Header'
import Movie from './Movie'
import Search from './Search'

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=3939f0a1";

const App = () => {

  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then(res => res.json())
      .then(jsonRes => {
        setMovies(jsonRes.Search);
        setLoading(false);
      });
  }, []);

  const search = searchValue => {
    setLoading(true);
    setErrorMessage(null);

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=3939f0a1`)
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.Response === "True") {
          setMovies(jsonRes.Search);
          setLoading(false);
        } else {
          setErrorMessage(jsonRes.Error);
          setLoading(false);
        };
      });
  };

  return (
    <div className="App">
      <Header text="KiNSHiR Hooked"/>
      <Search search={search}/>
      <p className="App-intro">Sharing a few of movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
        ))
        )};
      </div>
    </div>
  );
}

export default App;
