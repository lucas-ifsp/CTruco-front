import React from "react";
import { Link } from 'react-router-dom';
import "./SignIn.css";

const SignIn = props => 
    <main className="registration">
        <form>
            <p className="title fs-3 mb-3 fw-bold text-center">
                <i className="bi bi-suit-club-fill"/>  Entrar no CTruco <i className="bi bi-suit-club-fill"/>
            </p>
            <div className="mb-3 mt-4">
                <label for="inputEmail" className="form-label">E-mail</label>
                <input type="email" className="form-control" id="inputEmail" />
            </div>
            <div className="mb-3">
                <label for="inputPassword" className="form-label">Senha</label>
                <input type="password" class="form-control" id="inputPassword"/>
            </div>
            <button type="submit" className="btn w-100 btn-lg btn-dark mt-3 mb-3">Autenticar</button>
            <div class="mb-3 mt-3 text-center">
                <Link to="/register" class="link-dark">Novo aqui? Registre-se.</Link>
            </div>
        </form>
    </main>


export default SignIn 