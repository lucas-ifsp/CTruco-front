import React from "react";
import Card from "./Card";
import "./OpponentHand.css";

const OpponentHand = props => 
    <div className="opponent-hand"> 
        <div className="opponent-left"><Card name="back"/></div>
        <div className="opponent-center"><Card name="back"/></div>
        <div className="opponent-right"><Card name="back"/></div>
    </div>

export default OpponentHand;