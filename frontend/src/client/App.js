import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import './App.css';
import AddMeal from "./components/Meals/AddMeal";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import AMealById from "./components/Meals/AMealById";
import GetMeals from "./components/Meals/GetMeals";
import TestComponent from "./components/TestComponent/TestComponent";

function App() {
  return (
    <Router>
      <Header />
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/meals">
        <GetMeals />
      </Route>
      <Route exact path='/meals/:id'>
        <AMealById />
      </Route>
      <Route exact path="/addMeal">
        <AddMeal />
      </Route>
      <Route exact path="/test-component">
        <TestComponent></TestComponent>
      </Route>
      <Footer />
    </Router>
  );
}

export default App;
