import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { motion } from "framer-motion";

import Input from "../../shared/components/FormElements/Input/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button/Button";
import { useForm } from "../../shared/hooks/formHook";
import Spinner from "../../shared/components/UIElements/Spinner/Spinner";
import Modal from "../../shared/components/UIElements/Modal/Modal";
import { useHttpClient } from "../../shared/hooks/httpHook";
import "./Auth.css";

const Signup = () => {
  const [formState, inputHandler] = useForm(
    {
      username: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      confirmPassword: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const { showSpinner, error, sendRequest, clearError } = useHttpClient();
  const [isRedirect, setIsRedirect] = useState(false);

  const signupSubmitHandler = (event) => {
    event.preventDefault();

    sendRequest(
      process.env.REACT_APP_BACKEND_URL + "/signup",
      "POST",
      JSON.stringify({
        username: formState.inputs.username.value,
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
        confirmPassword: formState.inputs.confirmPassword.value,
      }),
      {
        "Content-Type": "application/json",
      }
    )
      .then((response) => {
        if (!response.error) {
          setIsRedirect(true);
        }
      })
      .catch(() => {});
  };

  if (isRedirect) {
    return <Redirect to="/login" />;
  }

  return (
    <React.Fragment>
      {showSpinner && <Spinner show={showSpinner} />}
      <Modal show={error} clicked={clearError}>
        {error}
      </Modal>
      <motion.div
        className="auth"
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ delay: 0.5, duration: 1, stiffness: 80, type: "spring" }}
      >
        <div className="auth__heading">
          <h1>Signup</h1>
        </div>
        <form className="auth__form" onSubmit={signupSubmitHandler}>
          <Input
            className="auth__input"
            element="input"
            id="username"
            type="text"
            label="Username"
            placeholder="Enter username"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="please enter a valid username."
            onInput={inputHandler}
          />
          <Input
            className="auth__input"
            element="input"
            id="email"
            type="email"
            label="Email"
            placeholder="Enter Email Id"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
            errorText="please enter a valid email."
            onInput={inputHandler}
          />
          <Input
            className="auth__input"
            element="input"
            id="password"
            type="password"
            label="Password"
            placeholder="Enter Password"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
            errorText="please enter a valid password (at 5 characters long)."
            onInput={inputHandler}
          />
          <Input
            className="auth__input"
            element="input"
            id="confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="Confirm Your Password"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="please enter the above password."
            onInput={inputHandler}
          />
          <div className="auth__btns">
            <Button
              className="auth__btn"
              type="submit"
              disabled={!formState.isValid}
            >
              Signup
            </Button>
            <Button className="auth__btn" to="/login">
              Login Now
            </Button>
          </div>
        </form>
      </motion.div>
    </React.Fragment>
  );
};

export default Signup;
