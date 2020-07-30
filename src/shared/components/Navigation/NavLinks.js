import React from "react";
import { NavLink } from "react-router-dom";

import sprite from "../../../Assets/Images/sprite.svg";
import "./NavLinks.css";

const NavLinks = (props) => {
  return (
    <ul className="nav--links">
      <div className="toggler">
        <span>&nbsp;</span>
      </div>
      <li>
        <NavLink to="/" exact onClick={props.onClick}>
          <svg className="svg">
            <use href={sprite + "#icon-shop"} />
          </svg>&nbsp;&nbsp;
          Shop
        </NavLink>
      </li>
      <li>
        <NavLink to="/cart" exact onClick={props.onClick}>
          <svg className="svg">
            <use href={sprite + "#icon-cart-plus"} />
          </svg>&nbsp;&nbsp;
          Cart
        </NavLink>
      </li>
      <li>
        <NavLink to="/orders" exact onClick={props.onClick}>
          <svg className="svg">
            <use href={sprite + "#icon-border_color"} />
          </svg>&nbsp;&nbsp;
          Orders
        </NavLink>
      </li>

      <li>
        <NavLink to="/signup" exact onClick={props.onClick}>
          <svg className="svg">
            <use href={sprite + "#icon-user-plus"} />
          </svg>&nbsp;&nbsp;
          Signup
        </NavLink>
      </li>
      <li>
        <NavLink to="/login" exact onClick={props.onClick}>
          <svg className="svg">
            <use href={sprite + "#icon-sign-in"} />
          </svg>&nbsp;&nbsp;
          Login
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
