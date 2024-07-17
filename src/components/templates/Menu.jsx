import React, { useState } from "react";
import { Navigate,Link } from "react-router-dom";
import useDeleteGame from '../../hooks/api/useDeleteGame';
import useRefreshToken from "../../hooks/api/useRefreshToken";
import useIntel from "../../hooks/context/useIntel";
import "./Menu.css";

const Menu = () => {
    const {intel, setIntel} = useIntel()
    const deleteConcludedGame = useDeleteGame()
    const {deleteTokens} = useRefreshToken()
    const [logged, setLogged] = useState(true)

    const handleNewGameSelection = () => {
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
            <Link to="/mat/start-game" onClick={handleNewGameSelection}><i className="bi bi-suit-club-fill"/> Nova Partida </Link>
            <Link to="/user-history" ><i className="bi bi-suit-spade-fill" /> Histórico de Partidas </Link>
            <Link to="/hall-of-fame" ><i className="bi bi-suit-heart-fill" /> Hall da Fama</Link>
            <Link to="/add-remote"><i className="bi bi-plus-circle"/>Bots Remotos</Link>
            <Link to="/" onClick={handleLogout}><i className="bi bi-suit-diamond-fill" /> Sair </Link>
        </nav>
    )
}
export default Menu;
