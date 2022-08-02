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

//SOLVE OPPONENT CARD NOT THROWING BUG
//EXTRACT API CALLS TO EXTERNAL FILES

 // TEST IF GAME RESULT AND WINNER SCORE HAS BEEN FIXED

const Mat = ({ initialIntel, uuid, token }) => {
    const endpoint = 'http://localhost:8080'

    const toCardString = card => card.rank === 'X' ? 'back' : `${card.rank}${card.suit}`
    const getCardsAsStrings = cards => cards.map(card => toCardString(card))
    const getPlayer = intel => intel.players.find(aPlayer => aPlayer.uuid === uuid)
    const getOpponent = intel => intel.players.find(aPlayer => aPlayer.uuid !== uuid)

    let player = getPlayer(initialIntel)
    let opponent = getOpponent(initialIntel)

    const scoreToString = {3: 'truco', 6: 'seis', 9: 'nove', 12: 'doze'}
    const nextScoreAsString = {1: 'truco', 3: 'seis', 6: 'nove', 9: 'doze', 12: 'doze'}

    const [lastIntel, setLastIntel] = useState(initialIntel)
    const [missingIntel, setMissingIntel] = useState([initialIntel])

    const [vira, setVira] = useState(toCardString(initialIntel.vira))
    const [message, setMessage] = useState('Clique na carta para jogar. Segure o alt e clique na carta para ocultar.')
    const [rounds, setRounds] = useState([])
    const [handPoints, setHandPoints] = useState(1)

    const [playerHand, setPlayerHand] = useState(getCardsAsStrings(player.cards))
    const [playerCard, setPlayerCard] = useState(null)
    const [playerScore, setPlayerScore] = useState(0)

    const [opponentHand, setOpponentHand] = useState(getCardsAsStrings(opponent.cards))
    const [opponentCard, setOpponentCard] = useState(null)
    const [opponentScore, setOpponentScore] = useState(0)

    const [raiseDisabled, setRaiseDisabled] = useState(false)
    const [acceptDisabled, setAcceptDisabled] = useState(true)
    const [quitDisabled, setQuitDisabled] = useState(true)

    const [raiseLabel, setRaiseLabel] = useState('Pedir truco')
    const [quitLabel, setQuitLabel] = useState('Correr')


    useEffect(() => {
        if(!missingIntel) return
        const timeline = buildTimeline(missingIntel)
        timeline.forEach(animation => setTimeout(() => animation.event(), animation.time))
        setMissingIntel([])
    }, [lastIntel])

    function buildTimeline(missingIntel){
        const DELAY_UNIT = 120;
        const timeline = new Timeline()

        for(let i = 1; i < missingIntel.length; i++) {
            const prevIntel = missingIntel[i - 1]
            const currentIntel = missingIntel[i]

            if(currentIntel.event === 'HAND_START'){
                timeline.addEvent(DELAY_UNIT * 15, async () => prepareNewHand(currentIntel))
            } else if(currentIntel.event === 'GAME_OVER'){
                timeline.addEvent(DELAY_UNIT, async () => setPlayerScore(getPlayer(currentIntel).score))
                timeline.addEvent(0, async () => setOpponentScore(getOpponent(currentIntel).score))
            }else {
                if(hasChangedMatchProperty('handPoints', currentIntel, prevIntel)) 
                    timeline.addEvent(DELAY_UNIT * 3, async () => setHandPoints(currentIntel.handPoints))

                if(hasChangedOpponentProperty('cards', currentIntel, prevIntel)) 
                    timeline.addEvent(DELAY_UNIT * 5, async () => updateHand(getOpponent(currentIntel).cards, opponentHand, setOpponentHand))
                
                if(hasChangedPlayerProperty('cards', currentIntel, prevIntel)) 
                    timeline.addEvent(DELAY_UNIT * 3, async () => updateHand(getPlayer(currentIntel).cards, playerHand, setPlayerHand))

                if(hasChangedMatchProperty('openCards', currentIntel, prevIntel)) 
                    timeline.addEvent(DELAY_UNIT * 3, async () => updateOpenCards(currentIntel))

                if(hasChangedMatchProperty('roundWinnersUsernames', currentIntel, prevIntel)){
                    timeline.addEvent(DELAY_UNIT * 3, async () => setRounds(currentIntel.roundWinnersUsernames))
                    timeline.addEvent(DELAY_UNIT * 30, async () => clearOpenCards())
                } 
            }
            timeline.addEvent(DELAY_UNIT * 3, async () => updateButtons(currentIntel))  
            timeline.addEvent(DELAY_UNIT * 2, async () => updateMessage(currentIntel))  
        }
        return timeline.get()  
    }
    
    function updateButtons(intel) {
        const nextHandPointValue = intel.HandPointsProposal ? nextScoreAsString[`${intel.handPointsProposal}`] : nextScoreAsString[`${intel.handPoints}`]
        setRaiseLabel(`Pedir ${nextHandPointValue}`)
        setQuitLabel(intel.isMaoDeOnze? 'Rejeitar' : 'Correr')
        setRaiseDisabled(!isPlayerTurn(intel) || !canPerform(intel, 'RAISE'))
        setAcceptDisabled(!isPlayerTurn(intel) || !canPerform(intel, 'ACCEPT'))
        setQuitDisabled(!isPlayerTurn(intel) || !canPerform(intel, 'QUIT'))
    }

    const isPlayerTurn = intel => intel.currentPlayerUuid === uuid
    const canPerform = (intel, action) => isPlayerTurn(intel) && intel.possibleActions.includes(action)

    function prepareNewHand(intel){
        setHandPoints(1)
        setPlayerScore(getPlayer(intel).score)
        setOpponentScore(getOpponent(intel).score)
        setVira(toCardString(intel.vira))
        setPlayerHand(getCardsAsStrings(getPlayer(intel).cards))
        setOpponentHand(getCardsAsStrings(getOpponent(intel).cards))
        setRounds(intel.roundWinnersUsernames)
        clearOpenCards()
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

    function updateHand(cards, cardState, setCardStateFunction) {
        const getSameFromIntelOrNull = (handFromIntel, someCard) => handFromIntel.find(card => card === someCard) || null
        const getUpdatedHand = (receivedHand, handFromIntel) => receivedHand.map(card => getSameFromIntelOrNull(handFromIntel, card))
        const cardsFromIntel = getCardsAsStrings(cards)
        const updateHand = getUpdatedHand(cardState, cardsFromIntel)
        setCardStateFunction(updateHand)
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
        const isOpponentEvent = !!intel.eventPlayerUUID && intel.eventPlayerUUID !== uuid

        if (intel.event === 'GAME_OVER') {
            const result = intel.gameWinner === uuid? 'Venceu!' : 'Perdeu.'
            setMessage(`Game Over - Você ${result}`)
            return
        }
        if (isOpponentEvent && description.hasOwnProperty(intel.event)) {
            setMessage(`${getOpponent(intel).username} ${event}`)
            return
        }
        if(isPlayerTurn(intel)){
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
            await axios.post(url, undefined, { headers: headers })
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
                    quitLabel={quitLabel}
                    quitDisabled={quitDisabled}
                    acceptDisabled={acceptDisabled}
                    raiseDisabled={raiseDisabled}
                    raiseLabel={raiseLabel}
                    handlePointsChange={handlePointsChange}
                />
                <Message text={message} />
            </div>
        </main>
    )
}

export default Mat
