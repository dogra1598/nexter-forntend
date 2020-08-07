import React from "react";

import Button from "../../FormElements/Button/Button";
import "./Modal.css";

const Modal = (props) => {
    return (
        <div className="modal">
            <div className="modal__header">
                <h1>Some error occured!</h1>
            </div>
            <div className="modal__body">
                sdad asdasda asdasda sadasd asdasd sdsdljk klj sduiysad sdhsdjk sadjbdhjg sdjhgsd hjsa sdgsd uuyiu oqewe xxcnmxi jksad oiduwq adjhksaw qwe qweqw ads qwq dqw cdc cdc.
            </div>
            <div className="modal__footer">
                <Button className="modal__footer__btn">Close</Button>
            </div>
        </div>
    );
};

export default Modal;