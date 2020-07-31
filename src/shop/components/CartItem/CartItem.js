import React from "react";

import Button from "../../../shared/components/FormElements/Button/Button";
import "./CartItem.css";

const CartItem = (props) => {
  const itemPrice = (props.price * props.quantity).toFixed(2);

  return (
    <div className="cartItem">
      <div className="cartItem__section1">
        <div className="cartItem__title__price">
          <h1>{props.title}</h1>
          <h1>amount: ₹ {itemPrice}</h1>
        </div>
      </div>
      <div className="cartItem__section2">
        <div className="cart--product--image">
          <img src={props.image} alt={props.title} />
        </div>
      </div>
      <div className="cartItem__section3">
        <div className="changeQuantity">
          <Button className="removeProduct">-</Button>
          {props.quantity}
          <Button className="addProduct">+</Button>
        </div>
        <Button className="cartItem--delete">Delete</Button>
      </div>
    </div>
  );
};

export default CartItem;
