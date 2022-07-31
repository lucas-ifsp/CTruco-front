import React from 'react'
import Card from './Card'
import './OpponentHand.css'

const OpponentHand = ({cards}) => {
    const left = cards[0] ? 'back' : 'none'
    const center = cards[1] ? 'back' : 'none'
    const right = cards[2] ? 'back' : 'none'

    return (
        <div className='opponent-hand'> 
            <div className='opponent-left'><Card name={left}/></div>
            <div className='opponent-center'><Card name={center}/></div>
            <div className='opponent-right'><Card name={right}/></div>
        </div>
    )
}

export default OpponentHand