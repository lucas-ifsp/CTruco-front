import { useEffect, useState } from 'react'
import { getMissingIntel, postPointsDecision, postThrowingCard } from '../../../api/TrucoApi'
import OpenCards from '../cards/OpenCards'
import OpponentHand from '../cards/OpponentHand'
import PlayerHand from '../cards/PlayerHand'
import Commands from '../commands/Commands'
import Message from './Message'
import { createMessage } from './MessageFactory'
import Rounds from './Rounds'
import Score from './Score'

import './Mat.css'

//SOLVE OPPONENT CARD NOT THROWING BUG

const Mat = ({ initialIntel, uuid, token }) => {
    const nextScoreAsString = {1: 'truco', 3: 'seis', 6: 'nove', 9: 'doze', 12: 'doze'}

    const toCardString = card => card.rank === 'X' ? 'back' : `${card.rank}${card.suit}`
    const getCardsAsStrings = cards => cards.map(card => toCardString(card))
    const getPlayer = intel => intel.players.find(aPlayer => aPlayer.uuid === uuid)
    const getOpponent = intel => intel.players.find(aPlayer => aPlayer.uuid !== uuid)
    const canPerform = (intel, action) =>  intel.currentPlayerUuid === uuid && intel.possibleActions.includes(action)
    const delay = ms => new Promise(res => setTimeout(res, ms))

    let player = getPlayer(initialIntel)
    let opponent = getOpponent(initialIntel)

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
        if(!missingIntel || missingIntel.length === 0) return
        //console.log('-------')
        //console.log('Animating single hand')
        animate()
    }, [missingIntel])

    useEffect(() => {
        console.log('Updated opponent hand use effect: ' + new Date().getTime())
        console.log(opponentHand)
    }, [opponentHand])


    async function animate(){
       // const delay = ms => new Promise(res => setTimeout(res, ms))
        const DELAY_UNIT = 120;

        if(missingIntel.length === 1){
            setMissingIntel([])
            return
        }
    
        const prevIntel = missingIntel[0]
        const currentIntel = missingIntel[1]

        if(currentIntel.event === 'HAND_START'){
            await delay(DELAY_UNIT * 15)
            prepareNewHand(currentIntel)
        } else if(currentIntel.event === 'GAME_OVER'){
            await delay(DELAY_UNIT)
            setPlayerScore(getPlayer(currentIntel).score)
            setOpponentScore(getOpponent(currentIntel).score)
        } else {
            if(hasChangedMatchProperty('handPoints', currentIntel, prevIntel)) {
                await delay(DELAY_UNIT * 15)
                setHandPoints(currentIntel.handPoints)
            }
            if(hasChangedOpponentProperty('cards', currentIntel, prevIntel)) {
                await delay(DELAY_UNIT * 5)
                console.log('Opponent hand state before animate ' +  new Date().getTime())
                console.log(opponentHand)
                updateHand(getOpponent(currentIntel).cards, opponentHand, setOpponentHand, true) // remove boolean after finding the bug
            }
            if(hasChangedPlayerProperty('cards', currentIntel, prevIntel)) {
                await delay(DELAY_UNIT * 3)
                updateHand(getPlayer(currentIntel).cards, playerHand, setPlayerHand, false)  // remove boolean after finding the bug
            }
            if(hasChangedMatchProperty('openCards', currentIntel, prevIntel)) {
                await delay(DELAY_UNIT * 3)
                updateOpenCards(currentIntel)
            }
            if(hasChangedMatchProperty('roundWinnersUsernames', currentIntel, prevIntel)){
                await delay(DELAY_UNIT * 3)
                setRounds(currentIntel.roundWinnersUsernames)
                await delay(DELAY_UNIT * 30)
                clearOpenCards()
            } 
        
            await delay(DELAY_UNIT * 3)
            updateButtons(currentIntel)
            await delay(DELAY_UNIT * 2)
            updateMessage(currentIntel)
        }
        const remainingIntel = missingIntel.slice(1, missingIntel.length)
        setMissingIntel(remainingIntel)
    }

    // async function animate(){
    //     const DELAY_UNIT = 120;
    //     currentIntel = missingIntel[0];

    //     if(currentIntel.event === 'HAND_START'){
    //         prepareNewHand(currentIntel, DELAY_UNIT * 15)
    //     } else if(currentIntel.event === 'GAME_OVER'){
    //         renderLater(DELAY_UNIT, getPlayer(currentIntel).score, playerScore, setPlayerScore)
    //         renderLater(0, getOpponent(currentIntel).score, opponentScore, setOpponentScore)
    //     } else {
    //         renderLater(DELAY_UNIT * 15, currentIntel.handPoints, handPoints, setHandPoints)
    //         renderLater(DELAY_UNIT * 5, getUpdatedHand(getOpponent(currentIntel).cards, opponentHand), opponentHand, setOpponentHand)
    //         renderLater(DELAY_UNIT * 3, getUpdatedHand(getPlayer(currentIntel).cards, playerHand), playerHand, setPlayerHand)
            
    //         if(hasChangedMatchProperty('openCards', currentIntel, prevIntel)) {
    //             await delay(DELAY_UNIT * 3)
    //             updateOpenCards(currentIntel)
    //         }

    //         renderLater(DELAY_UNIT * 3, currentIntel.roundWinnersUsernames, rounds, setRounds)
    //         renderLater(DELAY_UNIT * 30, null, playerCard, setPlayerCard)
    //         renderLater(0, null, opponentCard, setOpponentCard)
        
    //         await delay()
    //         updateButtons(DELAY_UNIT * 3, currentIntel)
    //         await delay(DELAY_UNIT * 2)
    //         updateMessage(currentIntel)

    //         const remainingIntel = missingIntel.slice(1, missingIntel.length)
    //         setMissingIntel(remainingIntel)
    //     }
    // }

    // async function renderLater(newState, state, setState, millis){
    //     if(JSON.stringify(newState) !== JSON.stringify(state)){
    //         await delay(millis)
    //         setState(newState)
    //     }
    // }

    // function prepareNewHand(intel, millis){
    //     renderLater(millis, 1, handPoints, setHandPoints, millis)
    //     renderLater(0, getPlayer(intel).score, playerScore, setPlayerScore())
    //     renderLater(0, getOpponent(intel).score, opponentScore, setOpponentScore)
    //     renderLater(0, toCardString(intel.vira), vira, setVira)

    //     console.log('------- ' + new Date().getTime())
    //     console.log('New hand')
    //     console.log(intel)

    //     renderLater(0, getCardsAsStrings(getPlayer(intel).cards), playerHand, setPlayerHand)
    //     renderLater(0, getCardsAsStrings(getOpponent(intel).cards), opponentHand, setOpponentHand)
    //     renderLater(0, intel.roundWinnersUsernames, rounds, setRounds)

    //     renderLater(0, null, playerCard, setPlayerCard)
    //     renderLater(0, null, opponentCard, setOpponentCard)
    // }

    function prepareNewHand(intel){
        setHandPoints(1)
        setPlayerScore(getPlayer(intel).score)
        setOpponentScore(getOpponent(intel).score)
        setVira(toCardString(intel.vira))
        console.log('------- ' + new Date().getTime())
        console.log('New hand')
        console.log(intel)
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

    // function getUpdatedHand(cards, cardState) {
    //     const getSameFromIntelOrNull = (handFromIntel, someCard) => handFromIntel.find(card => card === someCard) || null
    //     const getUpdated = (receivedHand, handFromIntel) => receivedHand.map(card => getSameFromIntelOrNull(handFromIntel, card))
    //     const cardsFromIntel = getCardsAsStrings(cards)
    //     const updateHand = getUpdated(cardState, cardsFromIntel)
    //     return updateHand
    // }

    function updateHand(cards, cardState, setCardStateFunction, bot) {
        const getSameFromIntelOrNull = (handFromIntel, someCard) => handFromIntel.find(card => card === someCard) || null
        const getUpdatedHand = (receivedHand, handFromIntel) => receivedHand.map(card => getSameFromIntelOrNull(handFromIntel, card))
        const cardsFromIntel = getCardsAsStrings(cards)
        const updateHand = getUpdatedHand(cardState, cardsFromIntel)
        
        if(bot) {
            console.log('------- ' +  new Date().getTime())
            console.log(`Cards before: ${cardState} | Intel cards: ${cardsFromIntel} | Cards after: ${updateHand} `)
        }
        setCardStateFunction(updateHand)
    }

    function updateOpenCards(intel){
        if(intel.event !== 'PLAY') return
        const lastPlayedCard = intel.openCards.slice(-1)[0]
        const cardAsString = toCardString(lastPlayedCard)
        if(intel.eventPlayerUUID === uuid) setPlayerCard(cardAsString)
        else setOpponentCard(cardAsString)
    }

    function updateButtons(intel) {
        const nextHandPointValue = intel.handPointsProposal ? nextScoreAsString[`${intel.handPointsProposal}`] : nextScoreAsString[`${intel.handPoints}`]
        setRaiseLabel(`Pedir ${nextHandPointValue}`)
        setQuitLabel(intel.isMaoDeOnze? 'Rejeitar' : 'Correr')
        setRaiseDisabled(!canPerform(intel, 'RAISE'))
        setAcceptDisabled(!canPerform(intel, 'ACCEPT'))
        setQuitDisabled(!canPerform(intel, 'QUIT'))
    }

    function updateMessage(intel) {
        setMessage(createMessage(intel, uuid))
    }

    const handleCardPlay = async (card, action) => {
        await postThrowingCard({token, uuid, card, action})
        updateIntel()
    }

    const handlePointsChange = async action => {
        await postPointsDecision({token, uuid, action})
        updateIntel()
    }

    async function updateIntel() {
        const intelSinceBaseTimestamp = await getMissingIntel({token, uuid, lastIntelTimestamp : lastIntel.timestamp})
        if (intelSinceBaseTimestamp.length === 0) return
        setMissingIntel([lastIntel, ...intelSinceBaseTimestamp])
        const lastMissingIntel = intelSinceBaseTimestamp.slice(-1)[0]
        setLastIntel(lastMissingIntel)
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
                <PlayerHand cards={playerHand} handleCardPlay={handleCardPlay} canPlay={canPerform(lastIntel, 'PLAY')} />
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
