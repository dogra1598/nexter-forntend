import React from "react";
import { motion } from "framer-motion";

import "./Order.css";
import Button from "../../../shared/components/FormElements/Button/Button";

const Order = (props) => {
  const products = props.products.map((product) => {
    return (
      <div className="order__body" key={product.product._id}>
        <div className="order__product--title">{product.product.title}</div>
        <div className="order__product--quantity">
          Quantity: {product.quantity}
        </div>
      </div>
    );
  });
  return (
    <motion.div
      className="order"
      initial={{ y: "100vh" }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, duration: 1, stiffness: 80, type: "spring" }}
    >
      <div className="order__section1">
        <div className="order__id">#{props.orderId}</div>
        <hr></hr>
        <br></br>
        {products}
      </div>
      <div className="order__section2">
        <Button className="order__btn__invoice">Invoice</Button>
      </div>
    </motion.div>
  );
};

export default Order;
