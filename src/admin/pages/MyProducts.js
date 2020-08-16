import React, { useEffect, useState, useContext } from "react";

import Products from "../../shop/components/Products/Products";
import Spinner from "../../shared/components/UIElements/Spinner/Spinner";
import Modal from "../../shared/components/UIElements/Modal/Modal";
import { useHttpClient } from "../../shared/hooks/httpHook";
import { AuthContext } from "../../shared/context/authContext";
import "./MyProducts.css";

const MyProducts = () => {
  const auth = useContext(AuthContext);
  const { showSpinner, error, sendRequest, clearError } = useHttpClient();
  const [products, setProducts] = useState(null);
  const [isMyProducts, setIsMyProducts] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await sendRequest(
        `http://localhost:5000/admin/products/${auth.userId}`,
        "GET",
        null,
        {
          "Content-Type": "application/json",
        }
      );
      setProducts(response.products);
      if(isMyProducts) {
        setIsMyProducts(false);
      }
    };
    fetchData();
  }, [setProducts, error, sendRequest, auth.userId, setIsMyProducts, isMyProducts]);

  const updateMyProductsHandler = () => {
    setIsMyProducts(true);
  };

  return (
    <React.Fragment>
      {showSpinner && <Spinner show={showSpinner} />}
      <Modal show={error} clicked={clearError}>
        {error}
      </Modal>
      <div className="myproducts">
        {products && (
          <Products
            products={products}
            noProducts={"No products found"}
            myproducts={true}
            updateMyProducts={updateMyProductsHandler}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default MyProducts;
