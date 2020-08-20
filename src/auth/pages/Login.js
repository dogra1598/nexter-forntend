import React, { useContext } from "react";
import { motion } from "framer-motion";

import Input from "../../shared/components/FormElements/Input/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button/Button";
import { useForm } from "../../shared/hooks/formHook";
import { AuthContext } from "../../shared/context/authContext";
import Spinner from "../../shared/components/UIElements/Spinner/Spinner";
import Modal from "../../shared/components/UIElements/Modal/Modal";
import { useHttpClient } from "../../shared/hooks/httpHook";
import "./Auth.css";

const Login = () => {
  const auth = useContext(AuthContext);

  const [formState, inputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const { showSpinner, error, sendRequest, clearError } = useHttpClient();

  const signupSubmitHandler = (event) => {
    event.preventDefault();

    sendRequest(
      process.env.REACT_APP_BACKEND_URL + "/login",
      "POST",
      JSON.stringify({
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
      }),
      {
        "Content-Type": "application/json",
      }
    )
      .then((responseData) => {
        if (!error) {
          auth.login(responseData.userId, responseData.token);
        }
      })
      .catch(() => {});
  };

  return (
    <React.Fragment>
      {showSpinner && <Spinner show={showSpinner} />}
      <Modal show={error} clicked={clearError}>
        {error}
      </Modal>
      <motion.div
        className="auth"
        initial={{ x: "100vw" }}
        animate={{ x: 0 }}
        transition={{ delay: 0.5, duration: 1, stiffness: 80, type: "spring" }}
      >
        <div className="auth__heading">
          <h1>Login</h1>
        </div>
        <form className="auth__form" onSubmit={signupSubmitHandler}>
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
            validators={[VALIDATOR_REQUIRE()]}
            errorText="please enter a valid password."
            onInput={inputHandler}
          />
          <div className="auth__btns">
            <Button
              className="auth__btn"
              type="submit"
              disabled={!formState.isValid}
            >
              Login
            </Button>
            <Button className="auth__btn" to="/signup">
              Signup Now
            </Button>
          </div>
        </form>
      </motion.div>
    </React.Fragment>
  );
};

export default Login;
