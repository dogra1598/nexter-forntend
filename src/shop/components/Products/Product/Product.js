import React from "react";

import Button from "../../../../shared/components/FormElements/Button/Button";
import "./Product.css";

const Product = (props) => {
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
      <form>
        <Button className="btn--addtocart">Add to Cart</Button>
      </form>
      <Button to={`/products/${props.productId}`} excat="excat" className="btn--details">Details</Button>
    </div>
  );
};

export default Product;
