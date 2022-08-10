import React, { useContext, useState } from 'react';
import { createGameForUserAndBot } from '../../../api/GameApi';
import GameContext from '../../../contexts/GameContext';
import UserContext from '../../../contexts/UserContext';
import "./StartGameMat.css";


const StartGameMat = () => {
    const {setInitialIntel} = useContext(GameContext)
    const {uuid, token} = useContext(UserContext)
    const [botName, setBotName] = useState("MineiroByBueno")

    const handleSubmit = async event => {
        event.preventDefault();
        const payload = {userUuid: uuid, botName}
        const initialIntel = await createGameForUserAndBot(token, payload) 
        setInitialIntel(initialIntel)
    }

    return (
        <main className="choose-opponent">
            <form>
                <p className="fs-5 mb-3 text-center">
                    Nova partida
                </p>
                <div className="mb-3 mt-4">
                    <label htmlFor="inputOpponent" className="form-label">Oponente: </label>
                    <select className="form-select mb-3" value={botName} onChange={e => setBotName(e.target.value)}>
                        <option value="MineiroByBueno">MineiroByBueno</option>
                        <option value="DummyBot">DummyBot</option>
                    </select>
                </div>
                <button type="submit" className="btn w-100 btn-dark mt-3 mb-3" onClick={handleSubmit}>
                        Começar
                </button>
            </form>
        </main>
    );
}

export default StartGameMat