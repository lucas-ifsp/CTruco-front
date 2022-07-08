import React from "react";
import Card from "./Card";
import "./PlayerHand.css";

const PlayerHand = props => {
    const left = props.cards[0] || "none";
    const center = props.cards[1]|| "none";
    const right = props.cards[2] || "none";

    return (
        <div className="player-hand"> 
            <div className="player-left"><Card name={left}/></div>
            <div className="player-center"><Card name={center}/></div>
            <div className="player-right"><Card name={right}/></div>
        </div>
    )
}

export default PlayerHand;