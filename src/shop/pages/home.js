import React from "react";

import Products from "../components/Products/Products";
import logo from "../../Assets/Images/logo.png";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="home--heading">
        <div className="primary--heading">
          <img src={logo} alt="nexter" />
        </div>
        <div className="secondary--heading">
          <h1>Shoping online feels easier and more fun</h1>
        </div>
      </div>
      <Products />
    </div>
  );
};

export default Home;
