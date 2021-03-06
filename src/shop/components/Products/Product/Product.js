import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { motion } from "framer-motion";

import Button from "../../../../shared/components/FormElements/Button/Button";
import Spinner from "../../../../shared/components/UIElements/Spinner/Spinner";
import Modal from "../../../../shared/components/UIElements/Modal/Modal";
import { AuthContext } from "../../../../shared/context/authContext";
import { useHttpClient } from "../../../../shared/hooks/httpHook";
import "./Product.css";

const Product = (props) => {
  const auth = useContext(AuthContext);

  const { showSpinner, error, sendRequest, clearError } = useHttpClient();
  const [redirectCart, setRedirectCart] = useState(false);
  const [redirectMyProducts, setRedirectMyProducts] = useState(false);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    sendRequest(
      process.env.REACT_APP_BACKEND_URL + "/cart",
      "POST",
      JSON.stringify({
        productId: props.productId,
        userId: auth.userId,
      }),
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token,
      }
    )
      .then(() => {
        if (!error) {
          setRedirectCart(true);
        }
      })
      .catch(() => {});
  };

  if (redirectCart) {
    return <Redirect to={`/cart/${auth.userId}`} />;
  }

  const onDeleteHandler = (event) => {
    event.preventDefault();

    sendRequest(
      `${process.env.REACT_APP_BACKEND_URL}/admin/deleteProduct/${auth.userId}/${props.productId}`,
      "DELETE",
      null,
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token,
      }
    )
      .then(() => {
        setRedirectMyProducts(true);
        props.updateMyProducts();
      })
      .catch(() => {});
  };

  if (redirectMyProducts) {
    return <Redirect to={`/admin/products/${auth.userId}`} />;
  }

  let myButton1 = null;
  if (auth.isLoggedIn) {
    if (props.myproducts) {
      myButton1 = (
        <form onSubmit={onDeleteHandler}>
          <Button className="btn--addtocart" type="submit">
            Delete
          </Button>
        </form>
      );
    } else {
      myButton1 = (
        <form onSubmit={onSubmitHandler}>
          <Button className="btn--addtocart" type="submit">
            Add to Cart
          </Button>
        </form>
      );
    }
  }

  let myButton2 = null;
  if (auth.isLoggedIn && props.myproducts) {
    myButton2 = (
      <Button
        to={`/admin/editProduct/${props.productId}`}
        excat="excat"
        className="btn--details"
      >
        Update
      </Button>
    );
  } else {
    myButton2 = (
      <Button
        to={`/products/${props.productId}`}
        excat="excat"
        className="btn--details"
      >
        Details
      </Button>
    );
  }

  return (
    <React.Fragment>
      {showSpinner && <Spinner show={showSpinner} />}
      <Modal show={error} clicked={clearError}>
        {error}
      </Modal>
      <motion.div
        className="product__container"
        initial={{ x: "100vw" }}
        animate={{ x: 0 }}
        transition={{ delay: 0.5, duration: 1, stiffness: 80, type: "spring" }}
      >
        <div className="product">
          <div className="product__image">
            <img
              src={`${process.env.REACT_APP_ASSET_URL}/${props.imageUrl}`}
              alt={props.title}
            />
          </div>
          <div className="product__price">
            <h1>₹ {props.price}</h1>
          </div>
        </div>
        {myButton1}
        {myButton2}
        <div className="product__title">
          <h2>{props.title}</h2>
        </div>
      </motion.div>
    </React.Fragment>
  );
};

export default Product;
