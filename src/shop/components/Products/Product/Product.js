import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";

import Button from "../../../../shared/components/FormElements/Button/Button";
import Spinner from "../../../../shared/components/UIElements/Spinner/Spinner";
import Modal from "../../../../shared/components/UIElements/Modal/Modal";
import { AuthContext } from "../../../../shared/context/authContext";
import { useHttpClient } from "../../../../shared/hooks/httpHook";
import "./Product.css";

const Product = (props) => {
  const auth = useContext(AuthContext);

  const { showSpinner, error, sendRequest, clearError } = useHttpClient();
  const [isRedirect, setIsRedirect] = useState(false);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    sendRequest(
      "http://localhost:5000/cart",
      "POST",
      JSON.stringify({
        productId: props.productId,
        userId: auth.userId,
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
      {showSpinner && <Spinner show={showSpinner} />}
      <Modal show={error} clicked={clearError}>
        {error}
      </Modal>
      <div className="product__container">
        <div className="product">
          <div className="product__image">
            <img src={props.imageUrl} alt={props.title} />
          </div>
          <div className="product__price">
            <h1>₹ {props.price}</h1>
          </div>
        </div>
        {auth.isLoggedIn && (
          <form onSubmit={onSubmitHandler}>
            <Button className="btn--addtocart" type="submit">
              Add to Cart
            </Button>
          </form>
        )}
        <Button
          to={`/products/${props.productId}`}
          excat="excat"
          className="btn--details"
        >
          Details
        </Button>
      </div>
    </React.Fragment>
  );
};

export default Product;
