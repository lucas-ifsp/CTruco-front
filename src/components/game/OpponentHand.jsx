import React from "react";
import Card from "./Card";
import "./OpponentHand.css";

const OpponentHand = props => {
    const left = props.cards[0] ? "back" : "none";
    const center = props.cards[1] ? "back" : "none";
    const right = props.cards[2] ? "back" : "none";

    return (
        <div className="opponent-hand"> 
            <div className="opponent-left"><Card name={left}/></div>
            <div className="opponent-center"><Card name={center}/></div>
            <div className="opponent-right"><Card name={right}/></div>
        </div>
    )
}

export default OpponentHand;