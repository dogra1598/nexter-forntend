import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";

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

const AddProduct = (props) => {
  const auth = useContext(AuthContext);
  const { showSpinner, error, sendRequest, clearError } = useHttpClient();
  const [isRedirect, setIsRedirect] = useState(false);

  const [formState, inputHandler] = useForm(
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

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", formState.inputs.title.value);
    formData.append("price", formState.inputs.price.value);
    formData.append("description", formState.inputs.description.value);
    formData.append("image", formState.inputs.image.value);
    formData.append("userId", auth.userId);

    sendRequest("http://localhost:5000/admin/addProduct", "POST", formData, {
      Authorization: "Bearer " + auth.token,
    })
      .then(() => {
        if (!error) {
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
        <div className="addproduct__heading">
          <h1>Add Product</h1>
        </div>
        <form className="addproduct__form" onSubmit={onSubmitHandler}>
          {auth.isLoggedIn && (
            <Input
              className="addproduct__input"
              element="input"
              id="title"
              type="text"
              label="Title"
              placeholder="Enter Title"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="please enter a valid product title."
              onInput={inputHandler}
            />
          )}
          {auth.isLoggedIn && <ImageUpload id="image" onInput={inputHandler} />}
          {auth.isLoggedIn && (
            <Input
              className="addproduct__input"
              element="input"
              id="price"
              type="number"
              label="Price"
              placeholder="Enter price of the product"
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
                Add Product
              </Button>
            </div>
          )}
        </form>
      </div>
    </React.Fragment>
  );
};

export default AddProduct;
