import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Navigation from "./shared/components/Navigation/Navbar";
import Home from "./shop/pages/Home";
import Cart from "./shop/pages/Cart";
import SingleProduct from "./shop/pages/SingleProduct";
import Orders from "./shop/pages/Orders";
import Signup from "./auth/pages/Signup";
import Login from "./auth/pages/Login";
// import "./App.css";

const App = () => {
  return (
    <Router>
      <Navigation />
      <main>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/cart" exact>
            <Cart />
          </Route>
          <Route path="/orders" exact>
            <Orders />
          </Route>
          <Route path="/signup" exact>
            <Signup />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/products/:productId" exact>
            <SingleProduct />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
