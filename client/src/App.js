import React, { useState } from "react";
import { Route, Link } from "react-router-dom";
import axios from 'axios';

import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovieForm from './Forms/UpdateMovie'
import AddMovieForm from './Forms/AddMovieForm'


const App = (props) => {
  const [savedList, setSavedList] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const handleDelete = id => {
    axios.delete(`http://localhost:5000/api/movies/${id}`)
    .then(res => {
      window.history.go('/')
    })
    .catch(err => {
      console.error(err)
    })
  };

  return (
    <>
      <SavedList list={savedList} />
      <Link to="/add-movie">Add movie</Link>
      <Route 
        exact 
        path="/" 
        render={props => <MovieList {...props} handleDelete={handleDelete} />} 
      />
      <Route
          path="/movies/:id"
          render={props => (
              <Movie 
                {...props} 
                addToSavedList={addToSavedList}
                handleDelete={handleDelete}
              />
          )}
      />
      <Route 
        path="/update-movie/:id" 
        component={UpdateMovieForm} 
      />
      <Route path="/add-movie" component={AddMovieForm} />
    </>
  );
};

export default App;
