import React from "react";
import PlayerHand from "./PlayerHand";
import OpponentHand from "./OpponentHand";
import OpenCards from "./OpenCards";
import Points from "./Points";
import Rounds from "./Rounds";
import Commands from "./Commands";
import "./Mat.css";

const Mat = props => {
    const rounds = ["Lucas", "João"]
    return (
        <main className="mat-area">
            <div className="mat">
                <Commands quitDisabled = {rounds}/>
            </div>
        </main>
    )
}

export default Mat;