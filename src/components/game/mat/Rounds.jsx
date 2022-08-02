import React from "react";
import "./Rounds.css";

const Rounds = props => {

    const roundWinnerName = roundWinner => roundWinner || 'Empate'
    
    let rounds = props.rounds.map((roundWinner, index) =>  
        <span key={index}>{`${index+1}ª Rodada: ${roundWinnerName(roundWinner)}`}</span>)

    if (!rounds) rounds = "";    

    return (
        <div className="rounds">
            <span>{`Tentos da mão: ${props.points}`}</span>
            {rounds}
        </div>
    )
}

export default Rounds;