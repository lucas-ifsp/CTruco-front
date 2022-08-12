import React from 'react';
import { Link } from 'react-router-dom';
import "./Authentication.css";
import useAuthenticationForm from './useAuthenticationForm';
import validate from './validateAuthenticationInfo';


const Authentication = () => {
    
    const {values, errors, handleChange, handleSubmit} = useAuthenticationForm(validate)

    return (
        <main className="authentication">
            <form>
                <p className="title fs-4 mb-3 fw-bold text-center">
                    <i className="bi bi-suit-club-fill"/>  Entrar no CTruco <i className="bi bi-suit-club-fill"/>
                </p>
                <div className="mb-4 mt-4">
                    <label htmlFor="inputUsername" className="form-label">Usuário</label>
                    <input 
                        type="text" 
                        name="username"
                        className="form-control" 
                        id="inputUsername" 
                        value={values.username}
                        onChange={handleChange}
                    />
                    {errors.username && <p className="input-error">{errors.username}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="inputPassword" className="form-label">Senha</label>
                    <input 
                        type="password" 
                        name="password"
                        className="form-control" 
                        id="inputPassword"
                        value={values.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="input-error">{errors.password}</p>}
                    {errors.apiError && <p className="input-error">{errors.apiError}</p>}
                </div>
                <button 
                    type="submit" 
                    className="btn w-100 btn-dark mt-3 mb-3"
                    onClick={handleSubmit}>
                        Autenticar
                </button>
                <p className="mb-3 text-center">
                    Novo aqui? <Link to="/register" className="link-dark">Registre-se.</Link>
                </p>
            </form>
        </main>
    );
}

export default Authentication