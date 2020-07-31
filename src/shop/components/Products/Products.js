import React from "react";

import Product from "./Product/Product";
import "./Products.css";

const DUMMY_PRODUCTS = [
  {
    _id: "p1",
    title: "The world atlas of coffee",
    imageUrl:
      "https://images.pexels.com/photos/2187601/pexels-photo-2187601.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    price: 19.99,
    description: "This is an awesome book",
  },
  {
    _id: "p2",
    title: "Mountain Ranger Bicycle",
    imageUrl:
      "https://images.pexels.com/photos/544997/pexels-photo-544997.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    price: 399.99,
    description: "This is an awesome book",
  },
];

const Products = () => {
  const allProducts = DUMMY_PRODUCTS.map(product => {
    return (
      <Product
        key={product._id}
        productId={product._id}
        title={product.title}
        imageUrl={product.imageUrl}
        price={product.price}
        description={product.description}
      />
    );
  });
  return (
    <div className="products">{allProducts}</div>
  );
};

export default Products;
