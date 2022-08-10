import { useEffect, useState } from 'react'
import { getMissingIntel, postPointsDecision, postThrowingCard } from '../../../api/HandApi'
import OpenCards from '../../../components/game/cards/OpenCards'
import OpponentHand from '../../../components/game/cards/OpponentHand'
import PlayerHand from '../../../components/game/cards/PlayerHand'
import Commands from '../../../components/game/commands/Commands'
import Message from '../../../components/game/mat/Message'
import { createMessage } from '../../../components/game/mat/MessageFactory'
import Rounds from '../../../components/game/mat/Rounds'
import Score from '../../../components/game/mat/Score'
import './GameMat.css'

const Mat = ({ initialIntel, uuid, token }) => {
    const nextScoreAsString = {1: 'truco', 3: 'seis', 6: 'nove', 9: 'doze', 12: 'doze'}
    const DELAY_UNIT = 120;

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
        animate()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [missingIntel])

    async function animate(){
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
                updateHand(getOpponent(currentIntel).cards, opponentHand, setOpponentHand) 
            }
            if(hasChangedPlayerProperty('cards', currentIntel, prevIntel)) {
                await delay(DELAY_UNIT * 3)
                updateHand(getPlayer(currentIntel).cards, playerHand, setPlayerHand)  
            }
            if(hasChangedMatchProperty('openCards', currentIntel, prevIntel)) {
                await delay(DELAY_UNIT * 3)
                updateOpenCards(currentIntel)
            }
            if(hasChangedMatchProperty('roundWinnersUsernames', currentIntel, prevIntel)){
                await delay(DELAY_UNIT * 5)
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
