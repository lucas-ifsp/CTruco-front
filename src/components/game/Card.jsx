import React from "react";
import "./Card.css";
import IMAGES from "../../assets/images/cards/CardImages"


const Card = props => { 
    return (
        <div className="card"> 
            <img src={IMAGES[`card_${props.name}`]} alt="" />
        </div>
    )
}

export default Card;