import React from "react";
import "./Message.css"

const Message = props => {
    const isHidden = !!props.text ? "" : "hidden";
    return (
        <div className="message">
            <div className={`alert alert-warning ${isHidden}`} role="alert">
                {props.text}
            </div>
        </div>
    );
}

export default Message;