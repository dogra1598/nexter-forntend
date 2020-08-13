import React, { useEffect, useState } from "react";

import Products from "../components/Products/Products";
import logo from "../../Assets/Images/logo.png";
import Spinner from "../../shared/components/UIElements/Spinner/Spinner";
import Modal from "../../shared/components/UIElements/Modal/Modal";
import { useHttpClient } from "../../shared/hooks/httpHook";
import "./Home.css";

const Home = () => {
  const { showSpinner, error, sendRequest, clearError } = useHttpClient();
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await sendRequest(
        `http://localhost:5000`,
        "GET",
        null,
        {
          "Content-Type": "application/json",
        }
      );
      setProducts(response.products);
    };
    fetchData();
  }, [setProducts, error, sendRequest]);

  return (
    <React.Fragment>
      {showSpinner && <Spinner show={showSpinner} />}
      <Modal show={error} clicked={clearError}>
        {error}
      </Modal>
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
