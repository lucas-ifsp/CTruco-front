import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/Registration";
import "./Registration.css";


const Registration = props => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const handleSubmit = async event => {
        event.preventDefault();
        const signUpPayload = {
            username,
            email,
            password
        }
        const uuid = await register(signUpPayload)
        console.log(uuid)
        navigate('/login')
    }

    return (
        <main className="registration">
            <form>
                <p className="title fs-3 mb-3 fw-bold text-center">
                    <i className="bi bi-suit-club-fill"/>  Registrar no CTruco  <i className="bi bi-suit-club-fill"/>
                </p>
                <div className="mb-3 mt-4">
                    <label htmlFor="inputUsername" className="form-label">Nome do usuário</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="inputUsername" 
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputEmail" className="form-label">E-mail</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="inputEmail" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword" className="form-label">Senha</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="inputPassword"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputConfirmPassword" className="form-label">Confirme a Senha</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="inputConfirmPassword"
                        value={passwordConfirmation}
                        onChange={e => setPasswordConfirmation(e.target.value)}
                    />
                </div>
                <button 
                    type="submit" 
                    className="btn w-100 btn-lg btn-dark mt-3 mb-3"
                    onClick={handleSubmit}
                >
                    Cadastrar
                </button>
            </form>
        </main>
    )
}

export default Registration 