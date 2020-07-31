import React from "react";
import { useParams, Redirect } from "react-router-dom";

import Button from "../../shared/components/FormElements/Button/Button";
import "./SingleProduct.css";

const DUMMY_PRODUCTS = [
  {
    _id: "p1",
    title: "The world atlas of coffee",
    image:
      "https://images.pexels.com/photos/2187601/pexels-photo-2187601.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    price: 19.99,
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo ex repudiandae possimus voluptatum quaerat harum? Sed vero dolor voluptas beatae corporis quia tempore eveniet nihil suscipit maxime, modi iste aliquid eaque consequuntur placeat nisi, nostrum sit ea optio dolorum ipsum omnis? Totam reiciendis deserunt esse minus cum molestias tempora suscipit?",
  },
  {
    _id: "p2",
    title: "Mountain Ranger Bicycle",
    image:
      "https://images.pexels.com/photos/544997/pexels-photo-544997.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    price: 399.99,
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo ex repudiandae possimus voluptatum quaerat harum? Sed vero dolor voluptas beatae corporis quia tempore eveniet nihil suscipit maxime, modi iste aliquid eaque consequuntur placeat nisi",
  },
];

const SingleProduct = (props) => {
  const productId = useParams().productId;
  const product = DUMMY_PRODUCTS.filter((product) => {
    return product._id === productId;
  });

  if(product.length === 0) {
    return (
      <Redirect to="/" />
    );
  }

  return (
    <div className="single-product">
      <div className="single-product__image">
        <img src={product[0].image} alt={product[0].title} />
      </div>
      <div className="single-product__title">
        <h1>{product[0].title}</h1>
      </div>
      <div className="single-product__price">
        <h1>₹ {product[0].price}</h1>
      </div>
      <div className="single-product__description">
        <p>{product[0].description}</p>
      </div>
      <form>
        <Button className="single-product__btn--addtocart">Add to Cart</Button>
      </form>
    </div>
  );
};

export default SingleProduct;
