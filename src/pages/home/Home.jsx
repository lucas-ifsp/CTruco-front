import React, { useContext, useState } from 'react';
import Footer from '../../components/templates/Footer';
import Header from '../../components/templates/Header';
import Menu from '../../components/templates/Menu';
import UserContext from "../../contexts/UserContext";
import Mat from './mat/GameMat';

import './Home.css';

const Home = () => {

    // const endpoint = 'http://localhost:8080'
    // const username = 'Lucas'
    // const email = 'lucas.ruas@gmail.com'
    // const password = '123123'
    // const botName = 'MineiroByBueno'

    const {isAuthenticated} = useContext(UserContext)
    console.log(!isAuthenticated ? 'Not authenticated' : 'authenticated')    

    const defaultGameState = {
        uuid: null, 
        token: null,
        initialIntel: {}
    }

    const [gameState, setGameState] = useState(defaultGameState)

    // useEffect(() => {createGame()}, [])

    // const createGame = async () => {
    //     const registerPayload = {username, email, password}
    //     const { data: {uuid} } = await axios.post(`${endpoint}/register`, registerPayload)
    //     console.log(`Registered with UUID ${uuid}`)

    //     const loginPayload = {username, password}
    //     const {headers: { authorization }} = await axios.post(`${endpoint}/login`, loginPayload)
    //     console.log(`Receiverd token ${authorization}`)

    //     const gamePayload = {userUuid: uuid, botName}
    //     const headers = {
    //         'Content-Type': 'application/json',
    //         'Authorization': authorization
    //     }

    //     const {data: initialIntel} = await axios.post(`${endpoint}/api/v1/games/user-bot/`, gamePayload, {headers: headers})
    //     console.log('Created game and received intel:')
    //     console.log(initialIntel)

    //     const initialState = {uuid, token: authorization,initialIntel}
    //     setGameState(initialState)
    // }

    return (
        <div className='app'>
            <Header/>
            <Menu/>
            {gameState === defaultGameState ? 
                (<h1> Loading Game... </h1>) : 
                (<Mat initialIntel = {gameState.initialIntel} uuid = {gameState.uuid} token={gameState.token}/>)}
            <Footer/>
        </div>
    )
}
export default Home
