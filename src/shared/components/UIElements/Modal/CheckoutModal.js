import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";

import Input from "../../FormElements/Input/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
} from "../../../util/validators";
import { useForm } from "../../../hooks/formHook";
import Button from "../../FormElements/Button/Button";
import Backdrop from "../Backdrop/Backdrop";
import Spinner from "../Spinner/Spinner";
import Modal from "./Modal";
import { AuthContext } from "../../../context/authContext";
import { useHttpClient } from "../../../hooks/httpHook";
import "./CheckoutModal.css";

const CheckoutModal = (props) => {
  const auth = useContext(AuthContext);
  const [formState, inputHandler] = useForm(
    {
      cardholdername: {
        value: "",
        isValid: false,
      },
      cardnumber: {
        value: "",
        isValid: false,
      },
      expirationdate: {
        value: "",
        isValid: false,
      },
      cvv: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const { showSpinner, error, sendRequest, clearError } = useHttpClient();
  const [isRedirect, setIsRedirect] = useState(false);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    sendRequest(
      `${process.env.REACT_APP_BACKEND_URL}/orders/${auth.userId}`,
      "POST",
      null,
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token,
      }
    )
      .then(() => {
        if (!error) {
          setIsRedirect(true);
        }
      })
      .catch(() => {});
  };

  if (isRedirect) {
    return <Redirect to={`/orders/${auth.userId}`} />;
  }

  return (
    <React.Fragment>
      <Backdrop show={props.show} clicked={props.clicked} />
      {showSpinner && <Spinner show={showSpinner} />}
      <Modal show={error} clicked={clearError}>
        {error}
      </Modal>
      <div
        className="checkoutmodal"
        style={{
          transform: props.show
            ? "translate(-50%, -50%)"
            : "translate(-50%, -100vh)",
          opacity: props.show ? "1" : "0",
        }}
      >
        <div className="checkoutmodal__header">
          <h1>CHECKOUT</h1>
        </div>
        <div className="checkoutmodal__body">
          <form className="checkout__form" onSubmit={onSubmitHandler}>
            <Input
              className="checkout__input"
              element="input"
              id="cardholdername"
              type="text"
              label="Cardholder Name"
              placeholder="Ex: VISHAL DOGRA"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="please enter a valid Cardholder name."
              onInput={inputHandler}
            />
            <Input
              className="checkout__input"
              element="input"
              id="cardnumber"
              type="number"
              placeholder="Ex: 9834254376768765"
              label="Card Number"
              validators={[
                VALIDATOR_REQUIRE(),
                VALIDATOR_MAXLENGTH(16),
                VALIDATOR_MINLENGTH(16),
              ]}
              errorText="please enter a valid card number."
              onInput={inputHandler}
            />
            <div className="checkout__expcvv">
              <Input
                className="checkout__input"
                element="input"
                id="expirationdate"
                type="number"
                label="Expiration Date"
                placeholder="Ex: 0424"
                validators={[
                  VALIDATOR_REQUIRE(),
                  VALIDATOR_MINLENGTH(4),
                  VALIDATOR_MAXLENGTH(4),
                ]}
                errorText="please enter a valid expiration date."
                onInput={inputHandler}
              />
              <Input
                className="checkout__input"
                element="input"
                id="cvv"
                type="number"
                label="CVV"
                placeholder="Ex: 999"
                validators={[
                  VALIDATOR_REQUIRE(),
                  VALIDATOR_MINLENGTH(3),
                  VALIDATOR_MAXLENGTH(3),
                ]}
                errorText="please enter a valid cvv number."
                onInput={inputHandler}
              />
            </div>
            <div className="checkoutmodal__footer">
              <Button
                className="checkoutmodal__footer__btn checkoutmodal__footer__btn--placeorder"
                type="submit"
                disabled={!formState.isValid}
              >
                Place Oreder
              </Button>
            </div>
          </form>
          <div className="checkoutmodal__footer__btn--cancel">
            <Button
              className="checkoutmodal__footer__btn"
              onClick={props.clicked}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CheckoutModal;
