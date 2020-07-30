import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "./shared/components/Navigation/Navbar";
import Home from "./shop/pages/home";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Navigation />
      <main>
        <Route path="/" exact>
          <Home />
        </Route>
      </main>
    </Router>
  );
};

export default App;
