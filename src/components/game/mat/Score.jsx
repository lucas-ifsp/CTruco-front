import React from "react";
import "./Score.css"

const Score = props => 
    <div className={`score ${props.position}`}>
        <span>{`Jogador: ${props.player}`}</span>
        <span>{`Tentos: ${props.score}`}</span>
    </div>

export default Score;