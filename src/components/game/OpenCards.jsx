import React from "react";
import Card from "./Card";
import "./OpenCards.css";

const OpenCards = props => 
    <div className="open-cards"> 
        <div className="vira"><Card name="4C"/></div>
        <div className="deck"><Card name="back"/></div>
        <div className="opponent-card"><Card name="6H"/></div>
        <div className="player-card"><Card name="7D"/></div>
    </div>

export default OpenCards;