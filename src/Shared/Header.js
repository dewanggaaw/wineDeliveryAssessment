import React from "react";
import { GoGrabber } from "react-icons/go";
import { AiOutlineShoppingCart } from "react-icons/ai";
import logo from "../Assets/Images/WD.png";
import "./headerStyle.css";

function Header() {
  return (
    <div className="header">
      <GoGrabber size="3em" color="white" />
      <div className="logoAndName">
        <img className="wdLogo" src={logo} alt="Logo" />
        <h2 className="wdText">WINE.DELIVERY</h2>
      </div>
      <input
        style={{
          width: "20rem",
          background: "#F2F1F9",
          border: "none",
          padding: "0.5rem",
          marginLeft: "30rem",
        }}
        key="random1"
        placeholder={"Find your wine"}
      />
      <div className="leftCont">
        <h2 className="signUpButton">SIGN UP</h2>
        <h2 className="logInButton">LOG IN</h2>
        <AiOutlineShoppingCart size="2em" color="white" />
      </div>
    </div>
  );
}

export default Header;
