import React from "react";
import IMAGES from "../../../assets/images/cards/CardImages";
import "./Card.css";


const Card = props => { 
    let cardName = props.name;
    let played = "";
    
    if(cardName === "none"){
        played = "none";
        cardName = "back";
    }

    return (
        <div className={`card ${played}`}> 
            <img src={IMAGES[`card_${cardName}`]} alt={cardName} />
        </div>
    )
}

export default Card;