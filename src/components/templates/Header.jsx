import React  from "react";
import "./Header.css"
import logo from "../../assets/images/logo.png"

const Header = props => 
    <header className="header">
        <a href="/" className="logo">
            <img src={logo} alt="logo" />
        </a>
        <h1>CTruco - Truco for didactic purposes</h1>
    </header>

export default Header;

