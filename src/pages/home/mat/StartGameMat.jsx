import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useCreateGame from '../../../hooks/api/useCreateGame';
import SelectBots from './SelectBots';

import "./StartGameMat.css";

const StartGameMat = () => {
    const createWithBot = useCreateGame()
    const navigate = useNavigate();
    const location = useLocation(); 
    const from = location?.state?.from?.pathname || '/';

    const [botName, setBotName] = useState("MineiroByBueno")

    const handleSubmit = async event => {
        event.preventDefault()
        await createWithBot(botName)
    }

    return (
        <main className="choose-opponent">
            <form>
                <p className="fs-5 mb-3 text-center">
                    Nova partida
                </p>
                <div className="mb-3 mt-4">
                    <label htmlFor="inputOpponent" className="form-label">Oponente: </label>
        	        <SelectBots botName={botName} setBotName={setBotName}></SelectBots>
                </div>
                <button type="submit" className="btn w-100 btn-dark mt-3 mb-3" onClick={handleSubmit}>
                        Começar
                </button>
            </form>
        </main>
    );
}

export default StartGameMat