import { useEffect, useState } from 'react'
import Card from './Card'
import './PlayerHand.css'

const PlayerHand = ({cards, inTurn, handleCardPlay}) => {
    let baseLeft = cards[0] 
    let baseCenter = cards[1]
    let baseRight = cards[2]

    const [left, setLeft] = useState(baseLeft)
    const [center, setCenter] = useState(baseCenter)
    const [right, setRight] = useState(baseRight)

    useEffect(() => {
        baseLeft = cards[0] || 'none'
        baseCenter = cards[1] || 'none'
        baseRight = cards[2] || 'none'

        console.log(`${shouldUpdate(left, baseLeft)} | ${shouldUpdate(center, baseCenter)} | ${shouldUpdate(right, baseRight)}`)

        if(shouldUpdate(left, baseLeft)) setLeft(baseLeft) 
        if(shouldUpdate(center, baseCenter)) setCenter(baseCenter) 
        if(shouldUpdate(right, baseRight)) setRight(baseRight) 

        console.log(`${baseLeft} | ${baseCenter} | ${baseRight}`)
    }, cards)

    const shouldUpdate = (currentState, newState) => currentState !== 'back' || newState === 'none'

    const flipOrThrow = (e, currentState, setNextState, baseState) => {
        if(!inTurn || baseState === 'none') return
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
        handleCardPlay(card, action)
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