import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import useDeleteGame from '../../hooks/api/useDeleteGame';
import useRefreshToken from "../../hooks/api/useRefreshToken";
import useIntel from "../../hooks/context/useIntel";
import "./Menu.css";

const Menu = () => {
    const {intel, setIntel} = useIntel()
    const deleteConcludedGame = useDeleteGame()
    const {deleteTokens} = useRefreshToken()
    const [logged, setLogged] = useState(true)

    const handleNewGameSelection = event => {
        event.preventDefault()
        if(intel) return
        setIntel({})
    }

    const handleLogout = event => {
        event.preventDefault()
        const hasActiveGame = !!intel && Object.keys(intel).length > 0
        if(hasActiveGame) deleteConcludedGame()
        deleteTokens()
        setLogged(false)
    }

    return (
        !logged? 
        <Navigate to='/login'/>
        :<nav className="menu-area">
            <a href="/" onClick={handleNewGameSelection}><i className="bi bi-suit-club-fill"/> Nova Partida </a>
            <a href="/" ><i className="bi bi-suit-spade-fill" /> Histórico de Partidas </a>
            <a href="/" ><i className="bi bi-suit-heart-fill" /> Hall da Fama</a>
            <a href="/"><i className="bi bi-plus-circle"/> Adicionar Bot Remoto</a>
            <a href="/" onClick={handleLogout}><i className="bi bi-suit-diamond-fill" /> Sair </a>
        </nav>
    )
}
export default Menu;
