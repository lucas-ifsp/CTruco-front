import React, {useState} from 'react'
import Card from './Card'
import './PlayerHand.css'

const PlayerHand = ({cards, inTurn, handleCardPlay}) => {
    const initialLeft = cards[0] || 'none'
    const initialCenter = cards[1]|| 'none'
    const initialRight = cards[2] || 'none'

    const [left, setLeft] = useState(initialLeft)
    const [center, setCenter] = useState(initialCenter)
    const [right, setRight] = useState(initialRight)

    const doSomething = (e, currentState, setNextState, initialState) => {
        if( !inTurn || initialState === 'none') return
        if(e.altKey){
            const nextState = currentState === initialState ? 'back' : initialState
            setNextState(nextState)
            return
        } 
        const action = currentState === 'back'? 'discarded' : 'played' 
        const card = { 
            rank: initialState.charAt(0),
            suit: initialState.charAt(1)
        }
        handleCardPlay(card, action)
    }
    
    return (
        <div className='player-hand'> 
            <div className='player-left' onClick={(e) => doSomething (e, left, setLeft, initialLeft)} ><Card name={left}/></div>
            <div className='player-center' onClick={(e) => doSomething (e, center, setCenter, initialCenter)} ><Card name={center}/></div>
            <div className='player-right' onClick={(e) => doSomething (e, right, setRight, initialRight)}><Card name={right}/></div>
        </div>
    )
}

export default PlayerHand