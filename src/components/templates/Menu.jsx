import React from "react";
import useIntel from "../../hooks/context/useIntel";
import "./Menu.css";

const Menu = () => {
    const {intel, setIntel} = useIntel()

    const handleNewGameSelection = event => {
        event.preventDefault();
        if(intel) return
        setIntel({})
    }

    return (
        <nav className="menu-area">
            <a href="/" onClick={handleNewGameSelection}><i className="bi bi-suit-club-fill"/> Nova Partida </a>
            <a href="/" ><i className="bi bi-suit-spade-fill" /> Histórico de Partidas </a>
            <a href="/" ><i className="bi bi-suit-heart-fill" /> Hall da Fama</a>
        </nav>
    )
}
export default Menu;
