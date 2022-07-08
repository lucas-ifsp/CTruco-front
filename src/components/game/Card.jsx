import React from "react";
import "./Card.css";
import IMAGES from "../../assets/images/cards/CardImages"


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