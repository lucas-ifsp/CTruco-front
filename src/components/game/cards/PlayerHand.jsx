import { useEffect, useState } from 'react'
import useThrowCard from '../../../hooks/api/useThrowCard'
import useAuth from '../../../hooks/context/useAuth'
import useIntel from '../../../hooks/context/useIntel'
import Card from './Card'
import './PlayerHand.css'


const PlayerHand = ({cards}) => {
    let baseLeft = cards[0] 
    let baseCenter = cards[1]
    let baseRight = cards[2]

    const [left, setLeft] = useState(baseLeft)
    const [center, setCenter] = useState(baseCenter)
    const [right, setRight] = useState(baseRight)

    const throwCardAs = useThrowCard()
    const { auth: {uuid}} = useAuth()
    const { intel } = useIntel()


    useEffect(() => {
        baseLeft = cards[0] || 'none'
        baseCenter = cards[1] || 'none'
        baseRight = cards[2] || 'none'

        if(shouldUpdate(left, baseLeft)) setLeft(baseLeft) 
        if(shouldUpdate(center, baseCenter)) setCenter(baseCenter) 
        if(shouldUpdate(right, baseRight)) setRight(baseRight) 
    }, cards)

    const shouldUpdate = (currentState, newState) => currentState !== 'back' || newState === 'none'

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
            <div className='player-left' onClick={(e) => flipOrThrow (e, left, setLeft, baseLeft)} ><Card name={left}/></div>
            <div className='player-center' onClick={(e) => flipOrThrow (e, center, setCenter, baseCenter)} ><Card name={center}/></div>
            <div className='player-right' onClick={(e) => flipOrThrow (e, right, setRight, baseRight)}><Card name={right}/></div>
        </div>
    )
}

export default PlayerHand