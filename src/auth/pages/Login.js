import React, { useContext } from "react";

import Input from "../../shared/components/FormElements/Input/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button/Button";
import { useForm } from "../../shared/hooks/formHook";
import { AuthContext } from "../../shared/context/authContext";
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

  const signupSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs); // backend

    auth.login();
  };

  return (
    <div className="auth">
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
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
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
    </div>
  );
};

export default Login;
