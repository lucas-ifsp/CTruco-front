import React, { useContext } from "react";
import GameContext from "../../contexts/GameContext";
import "./Menu.css";

const Menu = () => {
    const {setInitialIntel, isGameActive, isGameWaitingOpponent} = useContext(GameContext)

    const handleNewGameSelection = event => {
        event.preventDefault();
        if(isGameActive() || isGameWaitingOpponent()) return
        setInitialIntel({})
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
