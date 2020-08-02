import React, { useContext } from "react";

import Button from "../../../../shared/components/FormElements/Button/Button";
import { AuthContext } from "../../../../shared/context/authContext";
import "./Product.css";

const Product = (props) => {
  const auth = useContext(AuthContext);

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
        <form>
          <Button className="btn--addtocart">Add to Cart</Button>
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
