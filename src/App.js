import React from "react";
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
import { useAuth } from "./shared/hooks/authHook"; 
import AddProduct from "./admin/pages/AddProduct";
import EditProduct from "./admin/pages/EditProduct";
import MyProducts from "./admin/pages/MyProducts";

const App = () => {
  const { token, userId, login, logout } = useAuth();

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
