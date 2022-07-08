import React from "react";
import Card from "./Card";
import "./PlayerHand.css";

const PlayerHand = props => 
    <div className="player-hand"> 
        <div className="player-left"><Card name="KC"/></div>
        <div className="player-center"><Card name="JD"/></div>
        <div className="player-right"><Card name="QH"/></div>
    </div>

export default PlayerHand;