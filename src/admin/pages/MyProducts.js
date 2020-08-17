import React, { useEffect, useState, useContext } from "react";

import Products from "../../shop/components/Products/Products";
import Spinner from "../../shared/components/UIElements/Spinner/Spinner";
import Modal from "../../shared/components/UIElements/Modal/Modal";
import Pagination from "../../shared/components/UIElements/Pagination/Pagination";
import { useHttpClient } from "../../shared/hooks/httpHook";
import { AuthContext } from "../../shared/context/authContext";
import "./MyProducts.css";

const MyProducts = () => {
  const auth = useContext(AuthContext);
  const { showSpinner, error, sendRequest, clearError } = useHttpClient();
  const [products, setProducts] = useState(null);
  const [isMyProducts, setIsMyProducts] = useState(false);
  const [currPage, setCurrPage] = useState(1);
  const [productsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      const response = await sendRequest(
        `http://localhost:5000/admin/products/${auth.userId}`,
        "GET",
        null,
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      setProducts(response.products);
      if (isMyProducts) {
        setIsMyProducts(false);
      }
    };
    fetchData();
  }, [
    setProducts,
    error,
    sendRequest,
    auth.userId,
    setIsMyProducts,
    isMyProducts,
    auth.token,
  ]);

  const updateMyProductsHandler = () => {
    setIsMyProducts(true);
  };

  const indexOfLastProduct = currPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  let currentProducts = null;
  if (products) {
    currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  }

  const paginate = PageNumber => setCurrPage(PageNumber);

  return (
    <React.Fragment>
      {showSpinner && <Spinner show={showSpinner} />}
      <Modal show={error} clicked={clearError}>
        {error}
      </Modal>
      <div className="myproducts">
        <div className="myproducts__heading">
          <h1>Product Added by You to Shop</h1>
        </div>
        {products && (
          <Products
            products={currentProducts}
            noProducts={"No products found"}
            myproducts={true}
            updateMyProducts={updateMyProductsHandler}
          />
        )}
        {products && (
          <Pagination
            productsPerPage={productsPerPage}
            totalPtoducts={products.length}
            paginate={paginate}
            currPage={currPage}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default MyProducts;
