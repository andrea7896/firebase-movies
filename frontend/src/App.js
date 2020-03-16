import React, { Component } from 'react';

import MovieList from './components/movie-list/movie-list'
import FilterBar from './components/filter-bar/filter-bar'
import CustomModal from './components/custom-modal/custom-modal'

import './App.css'

export default class App extends Component {

  constructor(props) {
      super(props);

      this.onMovieListCHange = this.onMovieListCHange.bind(this);
      this.closeModal = this.closeModal.bind(this);

      this.state = {
          movies: [],
          openModal: false
      }
  }

  movieSelected = null;

  onMovieListCHange = movies => {
      this.setState({movies});
  }

  openDetails = (movie) => {
    this.movieSelected = movie;
    this.forceUpdate();
    this.setState({
        openModal: true
    });
    console.log(this.movieSelected.title);
  }

  addNewMovie = (movie) => {
    this.movieSelected = null;
    this.setState({
        openModal: true
    });
  }

  closeModal = () => {
      this.movieSelected = undefined;
      this.setState({
          openModal: false
      });
  }

  render() {
    let moviesList = this.state.movies.map(movie => {
        return <MovieList movie={movie} key={movie.id} onClick={this.openDetails}></MovieList>
    });
    return (
        <div className="App">
            <CustomModal props={ { movie: this.movieSelected, open: this.state.openModal, onCloseModal: this.closeModal } }></CustomModal>
            <FilterBar props={{onChange: this.onMovieListCHange, onClick: this.addNewMovie }}></FilterBar>   
            {moviesList}
        </div>
    );
  }

}
