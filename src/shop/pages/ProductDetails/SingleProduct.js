import React, { useContext, useEffect, useState } from "react";
import { useParams, Redirect } from "react-router-dom";

import Button from "../../../shared/components/FormElements/Button/Button";
import { AuthContext } from "../../../shared/context/authContext";
import Spinner from "../../../shared/components/UIElements/Spinner/Spinner";
import Modal from "../../../shared/components/UIElements/Modal/Modal";
import ProductDetails from "./ProductDetails";
import { useHttpClient } from "../../../shared/hooks/httpHook";
import "./SingleProduct.css";

const SingleProduct = (props) => {
  const auth = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const { showSpinner, error, sendRequest, clearError } = useHttpClient();
  const [isRedirect, setIsRedirect] = useState(false);

  const productId = useParams().productId;

  useEffect(() => {
    const fetchData = async () => {
      const response = await sendRequest(
        `http://localhost:5000/products/${productId}`,
        "GET",
        null,
        {
          "Content-Type": "application/json",
        }
      );
      setProduct(response.product);
    };
    fetchData();
  }, [productId, setProduct, sendRequest]);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    sendRequest(
      "http://localhost:5000/cart",
      "POST",
      JSON.stringify({
        productId: product._id,
        userId: auth.userId
      }),
      {
        "Content-Type": "application/json",
      }
    )
      .then(() => {
        if (!error) {
          setIsRedirect(true);
        }
      })
      .catch(() => {});
  };

  if (isRedirect) {
    return <Redirect to={`/cart/${auth.userId}`} />;
  }

  return (
    <React.Fragment>
      {showSpinner && !product && <Spinner show={showSpinner} />}
      <Modal show={error} clicked={clearError}>
        {error}
      </Modal>
      <div className="single-product">
        {product && <ProductDetails product={product} />}
        {auth.isLoggedIn && (
          <form onSubmit={onSubmitHandler}>
            <Button className="single-product__btn--addtocart" type="submit">
              Add to Cart
            </Button>
          </form>
        )}
      </div>
    </React.Fragment>
  );
};

export default SingleProduct;
