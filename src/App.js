import React, { useState, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Navigation from "./shared/components/Navigation/Navbar";
import Home from "./shop/pages/Home";
import Cart from "./shop/pages/Cart";
import SingleProduct from "./shop/pages/ProductDetails/SingleProduct";
import Orders from "./shop/pages/Orders";
import Signup from "./auth/pages/Signup";
import Login from "./auth/pages/Login";
import { AuthContext } from "./shared/context/authContext";
import AddProduct from "./admin/pages/AddProduct";
import EditProduct from "./admin/pages/EditProduct";
import MyProducts from "./admin/pages/MyProducts";

let logoutTimer;

const App = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState()

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirationDate(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if(token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/cart/:userId" exact>
          <Cart />
        </Route>
        <Route path="/orders/:userId" exact>
          <Orders />
        </Route>
        <Route path="/products/:productId" exact>
          <SingleProduct />
        </Route>
        <Route path="/admin/addProduct" exact>
          <AddProduct />
        </Route>
        <Route path="/admin/editProduct/:productId" exact>
          <EditProduct />
        </Route>
        <Route path="/admin/products/:userId" exact>
          <MyProducts />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/products/:productId" exact>
          <SingleProduct />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Redirect to="/login" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        login: login,
        logout: logout,
        userId: userId,
      }}
    >
      <Router>
        <Navigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
