import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>My react app</h1>
        <Navbar />
        <Landing />
        <Footer />
      </div>
    );
  }
}

export default App;
