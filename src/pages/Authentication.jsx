import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authenticate } from '../api/AuthenticationApi';
import UserContext from "../contexts/UserContext";
import "./Authentication.css";


const Authentication = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const {setToken, setUsername : setContextUsername, setUuid} = useContext(UserContext)

    const handleSubmit = async event => {
        event.preventDefault();
        const requestPayload = {username, password}
        const token = await authenticate(requestPayload)
        const tokenPayload = parseJwt(token)
        setToken(token)
        setContextUsername(tokenPayload.username)
        setUuid(tokenPayload.userId)
        navigate('/')
    }

    function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    };

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

export default Authentication