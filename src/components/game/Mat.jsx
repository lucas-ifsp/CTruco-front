import React from "react";
import PlayerHand from "./PlayerHand";
import OpponentHand from "./OpponentHand";
import OpenCards from "./OpenCards";
import Score from "./Score";
import Rounds from "./Rounds";
import Commands from "./Commands";
import Message from "./Message";
import axios from "axios";
import "./Mat.css";

const Mat = props => {
    const rounds = ["Lucas", "João"];
    const playerCards = ["4C", null, "7H"];
    const opponentCards = [true, true, false];
    const vira = "KH";
    const playerCard = "AS";
    const opponentCard = null;
    const message = "Palmeiras não tem mundial";


    return (
        <main className="mat-area">
            <div className="mat">
                <div className="opponent-score"><Score player= "MineiroBot" score={10} position="top"/></div>
                <div className="player-score"><Score player= "Lucas" score={2} position="botton"/></div>
                <OpponentHand cards = {opponentCards}/>
                <OpenCards vira = {vira} playerCard = {playerCard} opponentCard = {opponentCard}/>
                <PlayerHand cards = {playerCards}/>
                <Rounds rounds={rounds} points={10}/>
                <Commands quitDisabled = {rounds}/>
                <Message text={message}/>
            </div>
        </main>
    )
}

export default Mat;