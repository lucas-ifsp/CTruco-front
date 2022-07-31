import axios from 'axios'
import { useEffect, useState } from 'react'
import OpenCards from '../cards/OpenCards'
import OpponentHand from '../cards/OpponentHand'
import PlayerHand from '../cards/PlayerHand'
import Commands from '../commands/Commands'
import Message from './Message'
import Rounds from './Rounds'
import Score from './Score'
import Timeline from './Timeline'

import './Mat.css'

const Mat = ({ initialIntel, uuid, token }) => {
    const endpoint = 'http://localhost:8080'

    const toCardString = card => card.rank === 'X' ? 'back' : `${card.rank}${card.suit}`
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
    const [handPoints, setHandPoints] = useState(1)

    const [playerHand, setPlayerHand] = useState(getCardsAsStrings(player.cards))
    const [playerCard, setPlayerCard] = useState(null)
    const [playerScore, setPlayerScore] = useState(0)

    const [opponentHand, setOpponentHand] = useState(getCardsAsStrings(opponent.cards))
    const [opponentCard, setOpponentCard] = useState(null)
    const [opponentScore, setOpponentScore] = useState(0)

    const [raiseDisabled, setRaiseDisabled] = useState(true)
    const [acceptDisabled, setAcceptDisabled] = useState(false)
    const [quitDisabled, setQuitDisabled] = useState(false)

    useEffect(() => {
        const timeline = buildTimeline(missingIntel)
        console.log(timeline)

        if(!timeline) return 
        timeline.forEach(animation => {
            setTimeout(() => animation.event(), animation.time)
        })
        setMissingIntel([])
    }, [lastIntel])

    function buildTimeline(missingIntel){
        if(missingIntel.length < 2) return 

        const DELAY_UNIT = 100;
        const timeline = new Timeline()

        for(let i = 1; i < missingIntel.length; i++) {
            const prevIntel = missingIntel[i - 1]
            const currentIntel = missingIntel[i]

            timeline.addEvent(0, async () => updateButtons(currentIntel))  

            if(hasChangedPlayerProperty('score', currentIntel, prevIntel)) 
                timeline.addEvent(DELAY_UNIT, async () => setPlayerScore(getPlayer(currentIntel).score))

            if(hasChangedOpponentProperty('score', currentIntel, prevIntel)) 
                timeline.addEvent(DELAY_UNIT, async () => setOpponentScore(getOpponent(currentIntel).score))

            if(hasChangedMatchProperty('handPoints', currentIntel, prevIntel)) 
                timeline.addEvent(DELAY_UNIT * 3, async () => setHandPoints(currentIntel.handPoints))

            if(hasChangedMatchProperty('vira', currentIntel, prevIntel)) 
                timeline.addEvent(DELAY_UNIT * 3, async () => setVira(toCardString(currentIntel.vira)))

            if(hasChangedOpponentProperty('cards', currentIntel, prevIntel)) 
                timeline.addEvent(DELAY_UNIT * 4, async () => updateOpponentCards(currentIntel))
            
            if(hasChangedPlayerProperty('cards', currentIntel, prevIntel)) 
                timeline.addEvent(DELAY_UNIT * 3, async () => updatePlayerCards(currentIntel))

            if(hasChangedMatchProperty('openCards', currentIntel, prevIntel)) 
                timeline.addEvent(DELAY_UNIT * 3, async () => updateOpenCards(currentIntel))

            if(hasChangedMatchProperty('roundWinnersUsernames', currentIntel, prevIntel)){
                timeline.addEvent(DELAY_UNIT * 3, async () => setRounds(currentIntel.roundWinnersUsernames))
                timeline.addEvent(DELAY_UNIT * 30, async () => clearOpenCards())
            } 
                     
        }
        return timeline.get()  
    }
    
    const isPlayerTurn = intel => intel.currentPlayerUuid === uuid
    const canPerform = (intel, action) => isPlayerTurn && intel.possibleActions.includes(action)

    function updateButtons(intel) {
        setRaiseDisabled(!isPlayerTurn(intel) || !canPerform(intel, 'RAISE'))
        setAcceptDisabled(!isPlayerTurn(intel) || !canPerform(intel, 'ACCEPT'))
        setQuitDisabled(!isPlayerTurn(intel) || !canPerform(intel, 'QUIT'))
    }

    function hasChangedPlayerProperty(propertyName, currentIntel, prevIntel) {
        return JSON.stringify(getPlayer(currentIntel)[propertyName]) !== JSON.stringify(getPlayer(prevIntel)[propertyName])
    }

    function hasChangedOpponentProperty(propertyName, currentIntel, prevIntel) {
        return JSON.stringify(getOpponent(currentIntel)[propertyName]) !== JSON.stringify(getOpponent(prevIntel)[propertyName])
    }

    function hasChangedMatchProperty(propertyName, currentIntel, prevIntel) {
        return JSON.stringify(currentIntel[propertyName]) !== JSON.stringify(prevIntel[propertyName])
    }

    function clearOpenCards(){
        setPlayerCard(null)
        setOpponentCard(null)
    }

    function updatePlayerCards(intel) {
        const getSameFromIntelOrNull = (handIntel, someCard) => handIntel.find(card => card === someCard) || null
        const getUpdatedHand = (handState, handIntel) => handState.map(card => getSameFromIntelOrNull(handIntel, card))

        const playerCardsFromIntel = getCardsAsStrings(getPlayer(intel).cards)

        if(intel.event === 'HAND_START'){
            setPlayerHand(playerCardsFromIntel)
            return
        }

        const numberOfPlayerCards = playerHand.filter(card => card !== null).length
        if(playerCardsFromIntel.length <= numberOfPlayerCards) 
            setPlayerHand(getUpdatedHand(playerHand, playerCardsFromIntel))
    }

    function updateOpponentCards(intel) {
        const getSameFromIntelOrNull = (handIntel, someCard) => handIntel.find(card => card === someCard) || null
        const getUpdatedHand = (handState, handIntel) => handState.map(card => getSameFromIntelOrNull(handIntel, card))

        const opponentCardsFromIntel = getCardsAsStrings(getOpponent(intel).cards)

        if(intel.event === 'HAND_START'){
            setOpponentHand(opponentCardsFromIntel)
            return
        }

        const numberOfOpponentCards = opponentHand.filter(card => card !== null).length
        if(opponentCardsFromIntel.length <= numberOfOpponentCards)
            setOpponentHand(getUpdatedHand(opponentHand, opponentCardsFromIntel))
    }

    function updateOpenCards(intel){
        if(intel.event !== 'PLAY') return
        const lastPlayedCard = intel.openCards.slice(-1)[0]
        const cardAsString = toCardString(lastPlayedCard)
        if(intel.eventPlayerUUID === uuid) setPlayerCard(cardAsString)
        else setOpponentCard(cardAsString)
    }

    function updateMessage(intel) {
        const description = {
            QUIT: 'correu!',
            QUIT_HAND: 'não aceitou a mão!',
            ACCEPT: 'aceitou!',
        }
        const event = description[intel.event]

        if (intel.isGameDone) {
            setMessage(`Game Over - Você ${player.score === 12 ? 'Venceu!' : 'Perdeu.'}`)
            return
        }
        if (!isPlayerTurn(intel) && description.hasOwnProperty(event)) {
            setMessage(`${getOpponent(intel).username} ${event}`)
            return
        }
        if (canPerform(intel, 'PLAY')) {
            setMessage('Clique na carta para jogar. Segure o alt e clique na carta para ocultar.')
            return
        }
        if (intel.handPointsProposal) {
            setMessage(`${getOpponent(intel).username} está pedindo ${scoreToString[intel.handPointsProposal]}`)
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
            setMissingIntel([lastIntel, ...intelSinceBaseTimestamp])
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
                    <Score player={opponent.username} score={opponentScore} position='top' />
                </div>
                <div className='player-score'>
                    <Score player={player.username} score={playerScore} position='botton' />
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
