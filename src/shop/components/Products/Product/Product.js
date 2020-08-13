import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";

import Button from "../../../../shared/components/FormElements/Button/Button";
import { AuthContext } from "../../../../shared/context/authContext";
import {useHttpClient} from "../../../../shared/hooks/httpHook";
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

  if(isRedirect) {
    return <Redirect to="/cart" />
  }

  return (
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
  );
};

export default Product;
