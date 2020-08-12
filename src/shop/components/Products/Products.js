import React from "react";

import Product from "./Product/Product";
import "./Products.css";

const Products = (props) => {
  const allProducts = props.products.map((product) => {
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

  if (allProducts.length === 0) {
    return (
      <div className="products__empty">
        <h1>
          Sorry No Products Found!
          <br />
          We will add soon.
        </h1>
      </div>
    );
  }

  return <div className="products">{allProducts}</div>;
};

export default Products;
