import React from "react";

import NavLinks from "./NavLinks";
import "./MobNav.css";

const MobNav = () => {
  return (
    <div className="mobNav">
      <input type="checkbox" className="mobNav__checkbox" id="toggle" />
      <label htmlFor="toggle" className="mobNav__button">
        <span className="mobNav__icon">&nbsp;</span>
      </label>
      <div className="mobNav__background">&nbsp;</div>
      <div className="mobNav__nav">
        <NavLinks />
      </div>
    </div>
  );
};

export default MobNav;
