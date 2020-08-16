import React, { useContext } from "react";

import Button from "../../../shared/components/FormElements/Button/Button";
import Spinner from "../../../shared/components/UIElements/Spinner/Spinner";
import Modal from "../../../shared/components/UIElements/Modal/Modal";
import { useHttpClient } from "../../../shared/hooks/httpHook";
import { AuthContext } from "../../../shared/context/authContext";
import "./CartItem.css";

const CartItem = (props) => {
  const { showSpinner, error, sendRequest, clearError } = useHttpClient();

  const auth = useContext(AuthContext);

  const deleteHandler = (event) => {
    event.preventDefault();

    sendRequest(
      `http://localhost:5000/deleteFromCart/${auth.userId}/${props.productId}`,
      "DELETE",
      null,
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token,
      }
    )
      .then(() => {
        if (!error) {
          props.updateCart();
        }
      })
      .catch(() => {});
  };

  const decreaseQuantityHandler = (event) => {
    event.preventDefault();

    sendRequest(
      `http://localhost:5000/decreaseQuantity/${auth.userId}/${props.productId}`,
      "DELETE",
      null,
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token,
      }
    )
      .then(() => {
        if (!error) {
          props.updateCart();
        }
      })
      .catch(() => {});
  };

  const increaseQuantityHandler = (event) => {
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
        Authorization: "Bearer " + auth.token,
      }
    )
      .then(() => {
        if (!error) {
          props.updateCart();
        }
      })
      .catch(() => {});
  };

  const itemPrice = (props.price * props.quantity).toFixed(2);

  return (
    <React.Fragment>
      {showSpinner && <Spinner show={showSpinner} />}
      <Modal show={error} clicked={clearError}>
        {error}
      </Modal>
      <div className="cartItem">
        <div className="cartItem__section1">
          <div className="cartItem__title__price">
            <h1>{props.title}</h1>
            <h1>amount: ₹ {itemPrice}</h1>
          </div>
        </div>
        <div className="cartItem__section2">
          <div className="cart--product--image">
            <img src={`http://localhost:5000/${props.image}`} alt={props.title} />
          </div>
        </div>
        <div className="cartItem__section3">
          <div className="changeQuantity">
            <form onSubmit={decreaseQuantityHandler}>
              <Button className="removeProduct" disabled={props.quantity === 1}>-</Button>
            </form>
            {props.quantity}
            <form onSubmit={increaseQuantityHandler}>
              <Button className="addProduct">+</Button>
            </form>
          </div>
          <form onSubmit={deleteHandler}>
            <Button className="cartItem--delete" type="submit">
              Delete
            </Button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CartItem;
