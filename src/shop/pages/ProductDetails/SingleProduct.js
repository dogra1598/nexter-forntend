import React, { useContext, useEffect, useState } from "react";
import { useParams, Redirect } from "react-router-dom";
import axios from "axios";

import Button from "../../../shared/components/FormElements/Button/Button";
import { AuthContext } from "../../../shared/context/authContext";
import Spinner from "../../../shared/components/UIElements/Spinner/Spinner";
import ProductDetails from "./ProductDetails";
import "./SingleProduct.css";

const SingleProduct = (props) => {
  const auth = useContext(AuthContext);

  const [showSpinner, setShowSpinner] = useState(false);
  const [product, setProduct] = useState(null);
  const [isRedirect, setIsRedirect] = useState(false);

  const productId = useParams().productId;

  useEffect(() => {
    setShowSpinner(true);
    axios
      .get(`http://localhost:5000/products/${productId}`)
      .then((response) => {
        setShowSpinner(false);
        setProduct(response.data.product);
      })
      .catch((err) => {
        setShowSpinner(false);
        setIsRedirect(true);
      });
  }, [productId, setProduct, setShowSpinner]);

  if(isRedirect) {
    return <Redirect to="/" />
  }

  return (
    <React.Fragment>
      {showSpinner && !product && <Spinner show={showSpinner} />}
      <div className="single-product">
        {product && <ProductDetails product={product} />}
        {auth.isLoggedIn && (
          <form>
            <Button className="single-product__btn--addtocart">
              Add to Cart
            </Button>
          </form>
        )}
      </div>
    </React.Fragment>
  );
};

export default SingleProduct;
