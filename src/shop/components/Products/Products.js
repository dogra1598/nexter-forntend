import React from "react";

import Product from "./Product/Product";
import "./Products.css";
import Button from "../../../shared/components/FormElements/Button/Button";

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
        myproducts={props.myproducts}
        updateMyProducts={props.updateMyProducts}
      />
    );
  });

  if (allProducts.length === 0) {
    return (
      <div className="products__empty">
        <h1>
          {props.noProducts
            ? props.noProducts
            : "Sorry No Products Found!\nWe will add soon."}
        </h1>
        {props.noProducts && (
          <Button
            to="/admin/addProduct"
            excat="excat"
            className="products__createproduct"
          >
            Add one now
          </Button>
        )}
      </div>
    );
  }

  return <div className="products">{allProducts}</div>;
};

export default Products;
