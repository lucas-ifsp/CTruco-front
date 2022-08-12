import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./Registration.css";
import useForm from './useRegistrationForm';
import validate from "./validateRegistrationInfo";

const Registration = () => {

    const [passwordVisible, setPasswordVisible] = useState(false)
    const {values, errors, handleChange, handleSubmit} = useForm(validate)

    const toggleIsPasswordVisible = () => setPasswordVisible(!passwordVisible)

    return (
        <main className="registration">
            <form>
                <p className="title fs-4 mb-3 fw-bold text-center">
                    <i className="bi bi-suit-club-fill"/>  Registrar no CTruco  <i className="bi bi-suit-club-fill"/>
                </p>
                <div className="mb-4 mt-4">
                    <label htmlFor="inputUsername" className="form-label">Nome do usuário</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="username"
                        id="inputUsername" 
                        value={values.username}
                        onChange={handleChange}
                    />
                    {errors.username && <p className="input-error">{errors.username}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="inputEmail" className="form-label">E-mail</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        name="email"
                        id="inputEmail" 
                        value={values.email}
                        onChange={handleChange}
                />
                {errors.email && <p className="input-error">{errors.email}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="inputPassword" className="form-label">Senha</label>
                    <div className="input-group">
                        <input 
                            type={passwordVisible ? "text" : "password"}  
                            className="form-control" 
                            name="password"
                            id="inputPassword"
                            value={values.password}
                            onChange={handleChange}
                        />
                        <button 
                            className="btn btn-outline-secondary btn-eye" 
                            type="button"
                            onClick={toggleIsPasswordVisible}
                        >
                            <i className={`bi bi-eye${passwordVisible ? "" : "-slash"}-fill`}/>
                        </button>
                    </div>
                    {errors.password && <p className="input-error">{errors.password}</p>}
                </div>
                <button 
                    type="submit" 
                    className="btn w-100 btn-dark mt-3 mb-3"
                    onClick={handleSubmit}
                >
                    Cadastrar
                </button>
                <p className="mb-3 text-center">
                    Já possui uma conta? <Link to="/login" className="link-dark">Faça login.</Link>
                </p>
            </form>
        </main>
    )
}

export default Registration 