import React, {useState, useEffect} from "react";
import PlayerHand from "./PlayerHand";
import OpponentHand from "./OpponentHand";
import OpenCards from "./OpenCards";
import Score from "./Score";
import Rounds from "./Rounds";
import Commands from "./Commands";
import Message from "./Message";

import "./Mat.css";

const Mat = () => {

    const closedCards = ["back", "back", "back"]
    let intel = null;
    let player = null;
    let opponent = null;

    const scoreToString = {
        3 : "truco",
        6: "seis",
        9: "nove",
        12: "doze"
    }

    const [vira, setVira] = useState(null);
    const [message, setMessage] = useState("");
    const [rounds, setRounds] = useState([]);
    const [handPoints, setHandPoints] = useState(0);

    const [playerHand, setPlayerHand] = useState(closedCards);
    const [playerCard, setPlayerCard] = useState(null);
    const [playerScore, setPlayerScore] = useState(0);
    const [playerUsername, setPlayerUsername] = useState("");
    
    const [opponentHand, setOpponentHand] = useState(closedCards);
    const [opponentCard, setOpponentCard] = useState(null);
    const [opponentScore, setOpponentScore] = useState(0);
    const [opponentUsername, setOpponentUsername] = useState("");

    const [raiseDisabled, setRaiseDisabled] = useState(false); 
    const [acceptDisabled, setAcceptDisabled] = useState(false); 
    const [quitDisabled, setQuitDisabled] = useState(true); 

    useEffect(() => {
        intel = JSON.parse(localStorage.getItem("lastIntel"));
        setPlayers();
        setUsernames();
        prepareNewHand();
        updateView();
    }, []);

    function setPlayers(){
        player = intel.players.find(aPlayer => aPlayer.uuid === getPlayerUuid())
        opponent = intel.players.find(aPlayer => aPlayer.uuid !== getPlayerUuid())
    }

    function setUsernames(){
        setPlayerUsername(player.username);
        setOpponentUsername(opponent.username);
    }

    function prepareNewHand(){
        dealCards();
    }

    function dealCards(){
        const toCardString = card => card.rank + card.suit;
        setVira(toCardString(intel.vira));
        setOpponentHand(closedCards);
        const playerCards = player.cards.map(card => toCardString(card));
        setPlayerHand(playerCards);
    }
    
    function updateView () {
        updateButtons();
        setScores();
        setHandPoints(intel.handPoints);
        setRounds(intel.roundWinnersUsernames);
        updateMessage();
    }

    function updateButtons(){
        setRaiseDisabled(!isPlayerTurn(intel) || !canPerform("RAISE"))
        setAcceptDisabled(!isPlayerTurn(intel) || !canPerform("ACCEPT"))
        setQuitDisabled(!isPlayerTurn(intel) || !canPerform("QUIT"))
    }

    const canPerform = action => intel.possibleActions.includes(action);

    function setScores(){
        setPlayerScore(player.score);
        setOpponentScore(opponent.score);
    }

    function updateMessage(){
        if(intel.isGameDone){ 
            setMessage(`Game Over - Você ${player.score === 12? "Venceu!" : "Perdeu."}`);
            return;
        }
        if(!isPlayerTurn()){
            switch(intel.event){
                case "QUIT" : setMessage(`${opponent.name} correu!`); break;
                case "QUIT_HAND" : setMessage(`${opponent.name} não aceitou a mão!`); break;
                case "ACCEPT" : setMessage(`${opponent.name} aceitou!`); break;
            }
            return;
        }
        if (canPerform("PLAY")) setMessage("Click esquerdo na carta para jogar. Clique direito na carta para ocultar.");
        else if (intel.handPointsProposal) setMessage(`${opponent.name} está pedindo ${scoreToString[intel.handPointsProposal]}`);
        else if (intel.isMaoDeOnze && intel.handPoints === 1) setMessage("Mão de Onze! Escolha se você aceita ou corre.");
        else setMessage("");
    }

    const isPlayerTurn = () => intel.currentPlayerUuid === getPlayerUuid();

    const getPlayerUuid = () => localStorage.getItem("uuid");

    return (
        <main className="mat-area">
            <div className="mat">
                <div className="opponent-score"><Score player= {opponentUsername} score={opponentScore} position="top"/></div>
                <div className="player-score"><Score player= {playerUsername} score={playerScore} position="botton"/></div>
                <OpponentHand cards = {opponentHand}/>
                <OpenCards vira = {vira} playerCard = {playerCard} opponentCard = {opponentCard}/>
                <PlayerHand cards = {playerHand}/>
                <Rounds rounds={rounds} points={handPoints}/>
                <Commands quitDisabled = {quitDisabled} acceptDisabled = {acceptDisabled} raiseDisabled = {raiseDisabled} />
                <Message text={message}/>
            </div>
        </main>
    )
}

export default Mat;