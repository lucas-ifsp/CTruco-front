import React, { useContext } from 'react';
import Footer from '../../components/templates/Footer';
import Header from '../../components/templates/Header';
import Menu from '../../components/templates/Menu';
import GameContext from '../../contexts/GameContext';
import GameMat from './mat/GameMat';
import StartGameMat from './mat/StartGameMat';
import WelcomeMat from './mat/WelcomeMat';

import './Home.css';

const Home = () => {

    const {isGameWaitingOpponent, isGameActive} = useContext(GameContext)

    const selectMatComponent = () => {
        if(isGameActive()) return <GameMat/>
        if(isGameWaitingOpponent()) return <StartGameMat/>
        return <WelcomeMat/>
    }

    return (
        <div className='app'>
            <Header/>
            <Menu/>
            {selectMatComponent()}
            <Footer/>
        </div>
    )
}
export default Home
