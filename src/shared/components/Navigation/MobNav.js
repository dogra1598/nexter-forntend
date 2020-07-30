import React, { useState } from "react";

import NavLinks from "./NavLinks";
import "./MobNav.css";

const MobNav = () => {
  const [isChecked, setIsChecked] = useState(false);

  const checkboxHandler = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="mobNav">
      <input
        type="checkbox"
        className="mobNav__checkbox"
        id="toggle"
        checked={isChecked}
        onChange={() => {
          setIsChecked(!isChecked);
        }}
      />
      <label htmlFor="toggle" className="mobNav__button">
        <span className="mobNav__icon">&nbsp;</span>
      </label>
      <div className="mobNav__background">&nbsp;</div>
      <div className="mobNav__nav">
        <NavLinks onClick={checkboxHandler} />
      </div>
    </div>
  );
};

export default MobNav;
