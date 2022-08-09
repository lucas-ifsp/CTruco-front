import React, { useState } from 'react';
import "./StartGameMat.css";


const StartGameMat = () => {
    //const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    //const {setToken, setUsername : setContextUsername, setUuid} = useContext(UserContext)

    return (
        <main className="choose-opponent">
            <form>
                <p className="fs-5 mb-3 text-center">
                    Nova partida
                </p>
                <div className="mb-3 mt-4">
                    <label htmlFor="inputOpponent" className="form-label">Oponente: </label>
                    <select className="form-select mb-3">
                        <option value="1">MineiroByBueno</option>
                        <option value="2">DummyBot</option>
                    </select>
                </div>
                <button 
                    type="submit" 
                    className="btn w-100 btn-dark mt-3 mb-3">
                        Começar
                    </button>
            </form>
        </main>
    );
}

export default StartGameMat