import React from "react";
import { Link } from "react-router-dom";

import "./Button.css";

const Button = (props) => {
  if (props.to) {
    return (
      <Link
        to={props.to}
        excat={props.excat}
        className={`btn ${props.className}`}
      >
        {props.children}
      </Link>
    );
  }

  return (
    <button
      className={`btn ${props.className} ${props.disabled && "btn__disabled"}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
