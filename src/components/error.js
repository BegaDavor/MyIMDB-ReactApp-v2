import React, { Component } from "react";
import "../style/style.css";

class Error extends Component {
  state = {};
  render() {
    return (
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <h1>Oops!</h1>
            <h2>404 - The Page can't be found</h2>
          </div>
          <a href="/">Go To Homepage</a>
        </div>
      </div>
    );
  }
}

export default Error;
