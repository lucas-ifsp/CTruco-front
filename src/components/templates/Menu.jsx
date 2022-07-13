import React from "react";
import "./Menu.css";

const Menu = props => {

    return (
        <nav className="menu-area">
            <a href="/" ><i className="bi bi-suit-club-fill"/> Nova Partida </a>
            <a href="/" ><i className="bi bi-suit-spade-fill" /> Histórico de Partidas </a>
            <a href="/" ><i className="bi bi-suit-heart-fill" /> Hall da Fama</a>
        </nav>
    )
}
export default Menu;
