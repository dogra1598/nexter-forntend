import React, { useContext, useEffect, useState } from "react";
import { useParams, Redirect } from "react-router-dom";

import Button from "../../../shared/components/FormElements/Button/Button";
import { AuthContext } from "../../../shared/context/authContext";
import Spinner from "../../../shared/components/UIElements/Spinner/Spinner";
import ProductDetails from "./ProductDetails";
import { useHttpClient } from "../../../shared/hooks/httpHook";
import "./SingleProduct.css";

const SingleProduct = (props) => {
  const auth = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const { showSpinner, error, sendRequest } = useHttpClient();

  const [isRedirect, setIsRedirect] = useState(false);

  const productId = useParams().productId;

  useEffect(() => {
    const fetchData = async () => {
      const response = await sendRequest(
        `http://localhost:5000/products/${productId}`,
        "GET",
        null,
        {
          "Content-Type": "application/json",
        }
      );
      setProduct(response.product);
      if(error) {
        setIsRedirect(true);
      }
    };
    fetchData();
  }, [productId, setProduct, error, sendRequest]);

  if (isRedirect) {
    return <Redirect to="/" />;
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
