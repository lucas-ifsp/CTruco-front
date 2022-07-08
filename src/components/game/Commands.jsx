import React from "react";
import "./Commands.css";

const Commands = props => 
    <div className="commands">
        <button type="button" className="btn btn-secondary" disabled={props.raiseDisabled}>Pedir Truco</button>
        <button type="button" className="btn btn-secondary" disabled={props.acceptDisabled}>Aceitar</button>
        <button type="button" className="btn btn-secondary" disabled={props.quitDisabled}>Correr</button>
    </div>

export default Commands;