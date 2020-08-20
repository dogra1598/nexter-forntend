import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Navigation from "./shared/components/Navigation/Navbar";
import { AuthContext } from "./shared/context/authContext";
import { useAuth } from "./shared/hooks/authHook";
import Spinner from "./shared/components/UIElements/Spinner/Spinner";

const Home = React.lazy(() => import("./shop/pages/Home"));
const Cart = React.lazy(() => import("./shop/pages/Cart"));
const SingleProduct = React.lazy(() =>
  import("./shop/pages/ProductDetails/SingleProduct")
);
const Orders = React.lazy(() => import("./shop/pages/Orders"));
const Signup = React.lazy(() => import("./auth/pages/Signup"));
const Login = React.lazy(() => import("./auth/pages/Login"));
const AddProduct = React.lazy(() => import("./admin/pages/AddProduct"));
const EditProduct = React.lazy(() => import("./admin/pages/EditProduct"));
const MyProducts = React.lazy(() => import("./admin/pages/MyProducts"));

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
        <main>
          <Suspense fallback={<Spinner show={true} />}>{routes}</Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
