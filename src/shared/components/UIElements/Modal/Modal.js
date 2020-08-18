import React from "react";

import Button from "../../FormElements/Button/Button";
import Backdrop from "../Backdrop/Backdrop";
import "./Modal.css";

const Modal = (props) => {
  return (
    <React.Fragment>
      <Backdrop show={props.show} clicked={props.clicked} />
      <div
        className="modal"
        style={{
          transform: props.show
            ? "translate(-50%, -50%)"
            : "translate(-50%, -100vh)",
          opacity: props.show ? "1" : "0",
        }}
      >
        <div className="modal__header">
          <h1>Some error occured!</h1>
        </div>
        <div className="modal__body">{props.children}</div>
        <div className="modal__footer">
          <Button className="modal__footer__btn" onClick={props.clicked}>Close</Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Modal;
