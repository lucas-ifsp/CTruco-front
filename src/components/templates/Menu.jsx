import React from "react";
import axios from "axios";
import "./Menu.css";



const Menu = props => {

    const createUser = () => {
        const payload = {
            username: "Lucas",
            email: "lucas.ruas@gmail.com",
            password: "123123"
    
        }
        axios.post("http://localhost:8080/register", payload)
            .then(function (response) {
                localStorage.setItem("uuid", response.data.uuid)
                console.log(response.data.uuid);
            })
            .catch(function (error) {
                console.error(error);
            });
    }
    
    const authenticate = () => {
        const payload = {
            username: "Lucas",
            password: "123123"
        }
        axios.post("http://localhost:8080/login", payload)
            .then(function (response) {
                localStorage.setItem("token", response.headers.authorization);
                console.log("authenticated!");
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    const createGame = () => {
        const payload = {
            userUuid: localStorage.getItem("uuid"),
            botName: "MineiroBot"
        }
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
        }
        axios.post("http://localhost:8080/api/v1/games/user-bot/", payload, {headers: headers})
            .then(function (response) {
                localStorage.setItem("lastIntel", JSON.stringify(response.data))
                console.log(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    return (
        <nav className="menu-area">
            <a href="/" ><i className="bi bi-suit-club-fill"/> Nova Partida </a>
            <a href="/" ><i className="bi bi-suit-spade-fill" /> Histórico de Partidas </a>
            <a href="/" ><i className="bi bi-suit-heart-fill" /> Hall da Fama</a>
            <button onClick={createUser}>Register</button>
            <button onClick={authenticate}>Login</button>
            <button onClick={createGame}>New Game</button>
        </nav>
    )
}
export default Menu;
