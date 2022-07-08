import React from "react";
import "./Points.css"

const Points = props => 
    <div className="points">
        <span>{`Jogador: ${props.player}`}</span>
        <span>{`Tentos: ${props.score}`}</span>
    </div>

export default Points;