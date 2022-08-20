import { useEffect, useState } from 'react'
import useThrowCard from '../../../hooks/api/useThrowCard'
import useAuth from '../../../hooks/context/useAuth'
import useIntel from '../../../hooks/context/useIntel'
import Card from './Card'
import './PlayerHand.css'


const PlayerHand = ({cards}) => {
    const [left, setLeft] = useState(cards[0])
    const [center, setCenter] = useState(cards[1])
    const [right, setRight] = useState(cards[2])

    const throwCardAs = useThrowCard()
    const { auth: {uuid}} = useAuth()
    const { intel } = useIntel()


    useEffect(() => {
        const shouldUpdate = (currentState, newState) => newState === 'none' || currentState !== 'back' 
        if(shouldUpdate(left, cards[0])) setLeft(cards[0]) 
        if(shouldUpdate(center, cards[1])) setCenter(cards[1]) 
        if(shouldUpdate(right, cards[2])) setRight(cards[2]) 
    }, [cards, left, center, right])


    const flipOrThrow = async (e, currentState, setNextState, baseState) => {
        const canPlay = intel.last.currentPlayerUuid === uuid && intel.last.possibleActions.includes('PLAY')

        if(!canPlay || !baseState || baseState === 'none') return
        if(e.altKey){
            const nextState = currentState === baseState ? 'back' : baseState
            setNextState(nextState)
            return
        } 
        const action = currentState === 'back'? 'discarded' : 'played' 
        const card = { 
            rank: baseState.charAt(0),
            suit: baseState.charAt(1)
        }
        await throwCardAs(card, action)
    }
    
    return (
        <div className='player-hand'> 
            <div className='player-left' onClick={(e) => flipOrThrow (e, left, setLeft, cards[0])} ><Card name={left}/></div>
            <div className='player-center' onClick={(e) => flipOrThrow (e, center, setCenter, cards[1])} ><Card name={center}/></div>
            <div className='player-right' onClick={(e) => flipOrThrow (e, right, setRight, cards[2])}><Card name={right}/></div>
        </div>
    )
}

export default PlayerHand