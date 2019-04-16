import React, { Component } from "react";
import $ from "jquery";

import MovieRow from "./MovieRow";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = { row: [], limit: 10 };
    this.showTopRatedMoives = this.showTopRatedMovies.bind(this);
  }

  componentDidMount() {
    window.addEventListener("load", this.showTopRatedMovies());
  }

  performSearch(searchTerm) {
    const urlString =
      "https://api.themoviedb.org/3/search/movie?api_key=7b5e1cda23eb7882119f179972b71070&language=en-US&page=1&include_adult=false&query=" +
      searchTerm;
    $.ajax({
      url: urlString,
      success: searchResult => {
        console.log("Fetched data successfully!");
        const results = searchResult.results.sort(function(a, b) {
          return b.vote_average / 2 - a.vote_average / 2;
        });

        var moviesRows = [];

        results.forEach(movie => {
          movie.poster_src =
            "http://image.tmdb.org/t/p/w185" + movie.poster_path;
          console.log(movie);
          const movieRow = <MovieRow key={movie.id} movie={movie} />;
          moviesRows.push(movieRow);
        });
        this.setState({ rows: moviesRows.slice(0, this.state.limit) });
      },
      error: (xhr, status, err) => {
        console.log("Failed to fetch data!");
      }
    });
  }

  showTopRatedMovies() {
    const urlString =
      "https://api.themoviedb.org/3/movie/top_rated?api_key=7b5e1cda23eb7882119f179972b71070&language=en-US&page=1";
    return $.ajax({
      url: urlString,
      success: topMovies => {
        console.log("Fetched data successfully!");
        const results = topMovies.results;

        var moviesRows = [];

        results.forEach(movie => {
          movie.poster_src =
            "http://image.tmdb.org/t/p/w185" + movie.poster_path;
          console.log(movie);
          const showRow = <MovieRow key={movie.id} movie={movie} />;
          moviesRows.push(showRow);
        });
        this.setState({ rows: moviesRows.slice(0, this.state.limit) });
      },
      error: (xhr, status, err) => {
        console.log("Failed to fetch data!");
      }
    });
  }

  searchTermHandle(e) {
    const searchTerm = e.target.value;

    if (searchTerm.length > 2) this.performSearch(searchTerm);
    else this.showTopRatedMovies();
  }

  render() {
    return (
      <div>
        <h1>Movies</h1>
        <React.Fragment>
          <div className="md-form mt-0">
            <input
              type="text"
              placeholder="Search..."
              className="form-control"
              onChange={this.searchTermHandle.bind(this)}
            />
          </div>
          {this.state.rows}
        </React.Fragment>
      </div>
    );
  }
}

export default Movies;
