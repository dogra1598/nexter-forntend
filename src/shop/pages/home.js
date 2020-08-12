import React, { useEffect, useState } from "react";
import axios from "axios";

import Products from "../components/Products/Products";
import logo from "../../Assets/Images/logo.png";
import Spinner from "../../shared/components/UIElements/Spinner/Spinner";
import "./Home.css";

const Home = () => {
  const [showSpinner, setShowSpinner] = useState(false);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    setShowSpinner(true);
    axios.get("http://localhost:5000").then((response) => {
      setShowSpinner(false);
      setProducts(response.data.products);
    })
    .catch((err) => {
      setShowSpinner(false);
    })
  }, []);

  return (
    <React.Fragment>
      {showSpinner && <Spinner show={showSpinner} />}
      <div className="home">
        <div className="home--heading">
          <div className="primary--heading">
            <img src={logo} alt="nexter" />
          </div>
          <div className="secondary--heading">
            <h1>Shoping online feels easier and more fun</h1>
          </div>
        </div>
        {products && <Products products={products} />}
      </div>
    </React.Fragment>
  );
};

export default Home;
