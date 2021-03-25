import React, { Component } from "react";

import Shortener from "./components/shortener";

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Shortener />
      </div>
    );
  }
}
