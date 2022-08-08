import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.css";


const SignIn = props => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const handleSubmit = event => {
        event.preventDefault();
        console.log(username)
        console.log(password)
        navigate('/')
    }

    return (
        <main className="registration">
            <form>
                <p className="title fs-3 mb-3 fw-bold text-center">
                    <i className="bi bi-suit-club-fill"/>  Entrar no CTruco <i className="bi bi-suit-club-fill"/>
                </p>
                <div className="mb-3 mt-4">
                    <label htmlFor="inputUsername" className="form-label">Usuário</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="inputUsername" 
                        value={username}
                        onChange={e => setUsername(e.target.value)}
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
                <button 
                    type="submit" 
                    className="btn w-100 btn-lg btn-dark mt-3 mb-3"
                    onClick={handleSubmit}>
                        Autenticar
                    </button>
                <div className="mb-3 mt-3 text-center">
                    <Link to="/register" className="link-dark">Novo aqui? Registre-se.</Link>
                </div>
            </form>
        </main>
    );
}

export default SignIn