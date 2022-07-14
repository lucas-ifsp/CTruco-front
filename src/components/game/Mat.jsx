import axios from 'axios'
import { useEffect, useState } from 'react'
import Commands from './Commands'
import Message from './Message'
import OpenCards from './OpenCards'
import OpponentHand from './OpponentHand'
import PlayerHand from './PlayerHand'
import Rounds from './Rounds'
import Score from './Score'

import './Mat.css'

const Mat = ({ initialIntel, uuid, token }) => {
    const endpoint = 'http://localhost:8080'

    const toCardString = card => card.rank + card.suit
    const getCardsAsStrings = cards => cards.map(card => toCardString(card))
    const getPlayer = intel => intel.players.find(aPlayer => aPlayer.uuid === uuid)
    const getOpponent = intel => intel.players.find(aPlayer => aPlayer.uuid !== uuid)

    let player = getPlayer(initialIntel)
    let opponent = getOpponent(initialIntel)

    const scoreToString = {
        3: 'truco',
        6: 'seis',
        9: 'nove',
        12: 'doze',
    }

    const [lastIntel, setLastIntel] = useState(initialIntel)
    const [missingIntel, setMissingIntel] = useState([initialIntel])

    const [vira, setVira] = useState(toCardString(initialIntel.vira))
    const [message, setMessage] = useState('')
    const [rounds, setRounds] = useState([])
    const [handPoints, setHandPoints] = useState(0)

    const [playerHand, setPlayerHand] = useState(getCardsAsStrings(player.cards))
    const [playerCard, setPlayerCard] = useState(null)
    const [playerScore, setPlayerScore] = useState(0)
    const [playerUsername, setPlayerUsername] = useState(player.username)

    const [opponentHand, setOpponentHand] = useState(getCardsAsStrings(opponent.cards))
    const [opponentCard, setOpponentCard] = useState(null)
    const [opponentScore, setOpponentScore] = useState(0)
    const [opponentUsername, setOpponentUsername] = useState(opponent.username)

    const [raiseDisabled, setRaiseDisabled] = useState(true)
    const [acceptDisabled, setAcceptDisabled] = useState(false)
    const [quitDisabled, setQuitDisabled] = useState(false)

    // IMPLEMENT OPEN CARDS LOGIC
    // IMPLEMENT PREPARE NEW HAND
    // FIX UNDEFINED IN MESSAGE
    // ADD MORE ANIMATION WITHIN THE SAME INTEL

    useEffect(() => {
        missingIntel.forEach((intel, i) => {
            setTimeout(() => updateView(intel), i * 3000)
        })
        setMissingIntel([])
    }, [lastIntel])

    async function updateView(intel) {
        updatePlayersHands(intel)
        updateButtons(intel)
        updateHand(intel)
        updateScores(intel)
        updateMessage(intel)
    }

    function updateButtons(intel) {
        setRaiseDisabled(!isPlayerTurn(intel) || !canPerform(intel, 'RAISE'))
        setAcceptDisabled(!isPlayerTurn(intel) || !canPerform(intel, 'ACCEPT'))
        setQuitDisabled(!isPlayerTurn(intel) || !canPerform(intel, 'QUIT'))
    }

    const isPlayerTurn = intel => intel.currentPlayerUuid === uuid

    const canPerform = (intel, action) => intel.possibleActions.includes(action)

    function updateScores(intel) {
        setPlayerScore(getPlayer(intel).score)
        setOpponentScore(getOpponent(intel).score)
    }

    function updateHand(intel) {
        setVira(toCardString(intel.vira))
        setHandPoints(intel.handPoints)
        setRounds(intel.roundWinnersUsernames)
    }

    function updatePlayersHands(intel) {
        const getSameFromIntelOrNull = (handIntel, someCard) => handIntel.find(card => card === someCard) || null
        const getUpdatedHand = (handState, handIntel) => handState.map(card => getSameFromIntelOrNull(handIntel, card))
        setPlayerHand(getUpdatedHand(playerHand, getCardsAsStrings(getPlayer(intel).cards)))
        setOpponentHand(getUpdatedHand(opponentHand, getCardsAsStrings(getOpponent(intel).cards)))
    }

    function updateMessage(intel) {
        const description = {
            QUIT: 'correu!',
            QUIT_HAND: 'não aceitou a mão!',
            ACCEPT: 'aceitou!',
        }
        if (intel.isGameDone) {
            setMessage(`Game Over - Você ${player.score === 12 ? 'Venceu!' : 'Perdeu.'}`)
            return
        }
        if (!isPlayerTurn(intel)) {
            setMessage(`${opponent.name} ${description[intel.event]}`)
            return
        }
        if (canPerform(intel, 'PLAY')) {
            setMessage('Clique na carta para jogar. Segure o alt e clique na carta para ocultar.')
            return
        }
        if (intel.handPointsProposal) {
            setMessage(`${opponent.name} está pedindo ${scoreToString[intel.handPointsProposal]}`)
            return
        }
        if (intel.isMaoDeOnze && intel.handPoints === 1) {
            setMessage('Mão de Onze! Escolha se você aceita ou corre.')
            return
        }
        setMessage('')
    }

    async function updateIntel() {
        const url = `${endpoint}/api/v1/games/players/${uuid}/intel-since/${lastIntel.timestamp}`
        const headers = {
            'Content-Type': 'application/json',
            Authorization: token,
        }
        try {
            const {data: { intelSinceBaseTimestamp }} = await axios.get(url, { headers: headers })
            if (intelSinceBaseTimestamp.length === 0) return
            setMissingIntel([...intelSinceBaseTimestamp])
            const lastMissingIntel = intelSinceBaseTimestamp.slice(-1)[0]
            setLastIntel(lastMissingIntel)
        } catch (error) {
            console.error(error)
        }
    }

    const handleCardPlay = async (card, action) => {
        const url = `${endpoint}/api/v1/games/players/${uuid}/cards/${action}`
        const payload = { rank: card.rank, suit: card.suit }
        const headers = {
            'Content-Type': 'application/json',
            Authorization: token,
        }
        try {
            await axios.post(url, payload, { headers: headers })
            updateIntel()
        } catch (error) {
            console.error(error)
        }
    }

    const handlePointsChange = async action => {
        const url = `${endpoint}/api/v1/games/players/${uuid}/${action}`
        const headers = {
            Authorization: token,
        }
        try {
            console.log(url)
            const { data: newState } = await axios.post(url, undefined, { headers: headers })
            console.log(newState)
            updateIntel()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <main className='mat-area'>
            <div className='mat'>
                <div className='opponent-score'>
                    <Score player={opponentUsername} score={opponentScore} position='top' />
                </div>
                <div className='player-score'>
                    <Score player={playerUsername} score={playerScore} position='botton' />
                </div>
                <OpponentHand cards={opponentHand} />
                <OpenCards vira={vira} playerCard={playerCard} opponentCard={opponentCard} />
                <PlayerHand cards={playerHand} handleCardPlay={handleCardPlay} inTurn={isPlayerTurn(lastIntel)} />
                <Rounds rounds={rounds} points={handPoints} />
                <Commands
                    quitDisabled={quitDisabled}
                    acceptDisabled={acceptDisabled}
                    raiseDisabled={raiseDisabled}
                    handlePointsChange={handlePointsChange}
                />
                <Message text={message} />
            </div>
        </main>
    )
}

export default Mat
