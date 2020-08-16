import React from "react";

import "./SingleProduct.css";

const ProductDetails = (props) => {
  return (
    <div className="single-product">
      <div className="single-product__image">
        <img src={`http://localhost:5000/${props.product.imageUrl}`} alt={props.product.title} />
      </div>
      <div className="single-product__title">
        <h1>{props.product.title}</h1>
      </div>
      <div className="single-product__price">
        <h1>₹ {props.product.price}</h1>
      </div>
      <div className="single-product__description">
        <p>{props.product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
