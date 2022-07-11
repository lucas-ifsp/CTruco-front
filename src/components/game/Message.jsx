import React from "react";
import "./Message.css"

const Message = props => 
    <div className="message">
        <div className="alert alert-warning" role="alert">
            {props.text}
        </div>
    </div>
    

export default Message;