import React from "react";

import Button from "../../../shared/components/FormElements/Button/Button";
import "./CartItem.css";

const CartItem = (props) => {
  const itemPrice = (props.price * props.quantity).toFixed(2);

  return (
    <div className="cartItem">
      <h1>{props.title}</h1>
      <div className="cart--product--image">
        <img src={props.image} alt={props.title} />
      </div>
      <div>
        <Button>-</Button>
        {props.quantity}
        <Button>+</Button>
      </div>
      <h1>
        amount: {itemPrice}
      </h1>
    </div>
  );
};

export default CartItem;
