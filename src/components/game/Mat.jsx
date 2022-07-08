import React from "react";
import PlayerHand from "./PlayerHand";
import OpponentHand from "./OpponentHand";
import OpenCards from "./OpenCards";
import Score from "./Score";
import Rounds from "./Rounds";
import Commands from "./Commands";
import Message from "./Message";
import "./Mat.css";

const Mat = props => {
    const rounds = ["Lucas", "João"]
    return (
        <main className="mat-area">
            <div className="mat">
                <div className="opponent-score"><Score player= "MineiroBot" score={10} position="top"/></div>
                <div className="player-score"><Score player= "Lucas" score={2} position="botton"/></div>
                <OpponentHand/>
                <OpenCards/>
                <PlayerHand/>
                <Rounds rounds={rounds} points={10}/>
                <Commands quitDisabled = {rounds}/>
                <Message text="Palmeiras não tem mundial"/>
            </div>
        </main>
    )
}

export default Mat;