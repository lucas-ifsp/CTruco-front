import React from "react";
import Card from "./Card";
import "./OpenCards.css";

const OpenCards = props => {
    const vira = props.vira || "none";
    const opponentCard = props.opponentCard || "none";
    const playerCard = props.playerCard || "none";
    
    return (
        <div className="open-cards"> 
            <div className="vira"><Card name={vira}/></div>
            <div className="deck"><Card name="back"/></div>
            <div className="opponent-card"><Card name={opponentCard}/></div>
            <div className="player-card"><Card name={playerCard}/></div>
        </div>
    )
}
export default OpenCards;