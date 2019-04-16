import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Error from "./components/error";
import Movies from "./components/movies";
import TVShows from "./components/TVshows";
import Navigation from "./components/navigation";
import View from "./components/view";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route path="/" component={TVShows} exact />
          <Route path="/movies" component={Movies} />
          <Route path="/view" component={View} />
          <Route component={Error} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
