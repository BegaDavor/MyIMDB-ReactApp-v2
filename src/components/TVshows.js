import React, { Component } from "react";
import $ from "jquery";

import ShowRow from "./ShowRow";

class TVShows extends Component {
  constructor(props) {
    super(props);
    this.state = { row: [], limit: 10 };
    this.showTopRatedShows = this.showTopRatedTVShows.bind(this);
  }

  componentDidMount() {
    window.addEventListener("load", this.showTopRatedTVShows());
  }

  performSearch(searchTerm) {
    const urlString =
      "https://api.themoviedb.org/3/search/tv?api_key=7b5e1cda23eb7882119f179972b71070&language=en-US&page=1&query=" +
      searchTerm;
    $.ajax({
      url: urlString,
      success: searchResult => {
        console.log("Fetched data successfully!");
        const results = searchResult.results.sort(function(a, b) {
          return b.vote_average - a.vote_average;
        });

        var showsRows = [];

        results.forEach(show => {
          show.poster_src = "http://image.tmdb.org/t/p/w185" + show.poster_path;
          console.log(show);
          const showRow = <ShowRow key={show.id} show={show} />;
          showsRows.push(showRow);
        });
        this.setState({ rows: showsRows.slice(0, this.state.limit) });
      },
      error: (xhr, status, err) => {
        console.log("Failed to fetch data!");
      }
    });
  }

  showTopRatedTVShows() {
    const urlString =
      "https://api.themoviedb.org/3/tv/top_rated?api_key=7b5e1cda23eb7882119f179972b71070&language=en-US&page=1";
    return $.ajax({
      url: urlString,
      success: topShows => {
        console.log("Fetched data successfully!");
        const results = topShows.results;

        var showsRows = [];

        results.forEach(show => {
          show.poster_src = "http://image.tmdb.org/t/p/w185" + show.poster_path;
          console.log(show);
          const showRow = <ShowRow key={show.id} show={show} />;
          showsRows.push(showRow);
        });
        this.setState({ rows: showsRows.slice(0, this.state.limit) });
      },
      error: (xhr, status, err) => {
        console.log("Failed to fetch data!");
      }
    });
  }

  searchTermHandle(e) {
    const searchTerm = e.target.value;

    if (searchTerm.length > 2) this.performSearch(searchTerm);
    else {
      this.showTopRatedTVShows();
    }
  }

  render() {
    return (
      <div>
        <h1>TV Shows</h1>
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

export default TVShows;
