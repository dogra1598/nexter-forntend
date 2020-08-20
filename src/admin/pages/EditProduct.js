import React, { useContext, useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button/Button";
import Spinner from "../../shared/components/UIElements/Spinner/Spinner";
import Modal from "../../shared/components/UIElements/Modal/Modal";
import ImageUpload from "../../shared/components/FormElements/ImageUpload/ImageUpload";
import { useForm } from "../../shared/hooks/formHook";
import { useHttpClient } from "../../shared/hooks/httpHook";
import { AuthContext } from "../../shared/context/authContext";
import "./AddProduct.css";

const EditProduct = (props) => {
  const auth = useContext(AuthContext);
  const { showSpinner, error, sendRequest, clearError } = useHttpClient();
  const [isRedirect, setIsRedirect] = useState(false);
  const [product, setProduct] = useState();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
      price: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const productId = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const response = await sendRequest(
        `http://localhost:5000/products/${productId.productId}`,
        "GET",
        null,
        {
          "Content-Type": "application/json",
        }
      );
      setProduct(response.product);
      setFormData(
        {
          title: {
            value: response.product.title,
            isValid: true,
          },
          image: {
            value: null,
            isValid: false,
          },
          price: {
            value: response.product.price,
            isValid: true,
          },
          description: {
            value: response.product.description,
            isValid: true,
          },
        },
        false
      );
    };
    fetchData();
  }, [props.edit, productId, sendRequest, setFormData]);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", formState.inputs.title.value);
    formData.append("price", formState.inputs.price.value);
    formData.append("description", formState.inputs.description.value);
    formData.append("image", formState.inputs.image.value);
    formData.append("userId", auth.userId);
    formData.append("productId", productId.productId);

    sendRequest("http://localhost:5000/admin/editProduct", "PATCH", formData, {
      Authorization: "Bearer " + auth.token,
    })
      .then((response) => {
        if (!error) {
          console.log(response);
          setIsRedirect(true);
        }
      })
      .catch(() => {});
  };

  if (isRedirect) {
    return <Redirect to={`/admin/products/${auth.userId}`} />;
  }

  return (
    <React.Fragment>
      {showSpinner && <Spinner show={showSpinner} />}
      <Modal show={error} clicked={clearError}>
        {error}
      </Modal>
      <div className="addproduct">
        {product && (
          <div className="addproduct__heading">
            <h1>Update Product</h1>
          </div>
        )}
        {!showSpinner && product && (
          <form className="addproduct__form" onSubmit={onSubmitHandler}>
            {auth.isLoggedIn && (
              <Input
                className="addproduct__input"
                element="input"
                id="title"
                type="text"
                label="Title"
                placeholder="Enter Title"
                value={product.title}
                valid={true}
                validators={[VALIDATOR_REQUIRE()]}
                errorText="please enter a valid product title."
                onInput={inputHandler}
              />
            )}
            {auth.isLoggedIn && (
              <ImageUpload id="image" onInput={inputHandler} />
            )}
            {auth.isLoggedIn && (
              <Input
                className="addproduct__input"
                element="input"
                id="price"
                type="number"
                label="Price"
                placeholder="Enter price of the product"
                value={product.price}
                valid={true}
                validators={[VALIDATOR_REQUIRE()]}
                errorText="please enter a valid price tag fro the product."
                onInput={inputHandler}
              />
            )}
            {auth.isLoggedIn && (
              <Input
                className="addproduct__input addproduct__textarea"
                id="description"
                label="Description"
                placeholder="Enter the description of the product"
                value={product.description}
                valid={true}
                validators={[
                  VALIDATOR_REQUIRE(),
                  VALIDATOR_MAXLENGTH(5000),
                  VALIDATOR_MINLENGTH(20),
                ]}
                errorText="please enter the description for the between 20 to 5000 word."
                onInput={inputHandler}
              />
            )}
            {auth.isLoggedIn && (
              <div className="addproduct__btns">
                <Button
                  className="addproduct__btn"
                  type="submit"
                  disabled={!formState.isValid}
                >
                  Update
                </Button>
              </div>
            )}
          </form>
        )}
      </div>
    </React.Fragment>
  );
};

export default EditProduct;
