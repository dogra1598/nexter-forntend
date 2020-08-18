import React from "react";

import Backdrop from "../Backdrop/Backdrop";
import "./Spinner.css";

const Spinner = (props) => {
  return (
    <React.Fragment>
      <Backdrop show={props.show} />
      <div
        className="sk-cube-grid"
        style={{
          display: props.show ? "block" : "none",
          transform: props.show
            ? "translate(-50%, -50%)"
            : "translate(-50%, -100vh)",
          opacity: props.show ? "1" : "0",
        }}
      >
        <div className="sk-cube sk-cube1"></div>
        <div className="sk-cube sk-cube2"></div>
        <div className="sk-cube sk-cube3"></div>
        <div className="sk-cube sk-cube4"></div>
        <div className="sk-cube sk-cube5"></div>
        <div className="sk-cube sk-cube6"></div>
        <div className="sk-cube sk-cube7"></div>
        <div className="sk-cube sk-cube8"></div>
        <div className="sk-cube sk-cube9"></div>
      </div>
    </React.Fragment>
  );
};

export default Spinner;
