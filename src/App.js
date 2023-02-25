import "./App.css";

import React from "react";

import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import MovieSummary from "./components/MovieSummary";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/summary" element={<MovieSummary />}></Route>
      </Routes>
    </div>
  );
}

export default App;
