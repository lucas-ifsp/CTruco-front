import React from "react";
import logo from "../../assets/images/logo.png";
import "./Header.css";

const Header = () => (
  <header className="header">
    <img className="logo" src={logo} alt="logo" />
    <h1>CTruco - Truco for didactic purposes</h1>
  </header>
);

export default Header;
