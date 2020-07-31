import React from "react";

import "./Order.css";
import Button from "../../../shared/components/FormElements/Button/Button";

const Order = (props) => {
  const products = props.products.map((product) => {
    return (
      <div className="order__body" key={product._id}>
        <div className="order__product--title">{product.title}</div>
        <div className="order__product--quantity">
          Quantity: {product.quantity}
        </div>
      </div>
    );
  });
  return (
    <div className="order">
      <div className="order__section1">
        <div className="order__id">{props.orderId}</div>
        {products}
        <div className="order__totalPrice">
          Order Total: ₹ {props.totalPrice}
        </div>
      </div>
      <div className="order__section2">
          <Button className="order__btn__invoice">Invoice</Button>
      </div>
    </div>
  );
};

export default Order;
