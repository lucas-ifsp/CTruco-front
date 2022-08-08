import React from "react"
import "./Registration.css"


const Registration = props => 
    <main className="registration">
        <form>
            <p className="title fs-3 mb-3 fw-bold text-center">
                <i className="bi bi-suit-club-fill"/>  Registrar no CTruco  <i className="bi bi-suit-club-fill"/>
            </p>
            <div className="mb-3 mt-4">
                <label for="inputUsername" className="form-label">Nome do usuário</label>
                <input type="text" className="form-control" id="inputUsername" />
            </div>
            <div className="mb-3">
                <label for="inputEmail" className="form-label">E-mail</label>
                <input type="email" className="form-control" id="inputEmail" />
            </div>
            <div className="mb-3">
                <label for="inputPassword" className="form-label">Senha</label>
                <input type="password" class="form-control" id="inputPassword"/>
            </div>
            <div className="mb-3">
                <label for="inputConfirmPassword" className="form-label">Confirme a Senha</label>
                <input type="password" class="form-control" id="inputConfirmPassword"/>
            </div>
            <button type="submit" className="btn w-100 btn-lg btn-dark mt-3 mb-3">Cadastrar</button>
        </form>
    </main>


export default Registration 