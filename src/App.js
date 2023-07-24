import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Choose from "./pages/Choose";
import Homepage from "./pages/Homepage";
import Recipe from "./pages/Recipe";
import Select from "./pages/Select";

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route key="/" path="/" element={<Homepage />} />
        <Route key="/Select" path="/Select" element={<Select />} />
        <Route key="/Choose" path="/Choose" element={<Choose />} />
        <Route key="/Recipe" path="/Recipe" element={<Recipe />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;

// FROM /Cookbook node server.js
// FROM /Cookbook/client npm start
