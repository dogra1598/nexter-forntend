import React from "react";

import logo from "../../../Assets/Images/logo.png";
import sprite from "../../../Assets/Images/sprite.svg";
import NavLinks from "./NavLinks";
import MobNav from "./MobNav";
import "./Navbar.css";

const Navbar = (props) => {
  return (
    <React.Fragment>
      <div className="mob--navbar">
        <MobNav />
      </div>
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="nexter" />
        </div>
        <NavLinks />
        <div>
          <svg className="svg1">
            <use href={sprite + "#icon-cart-plus"} />
          </svg>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
