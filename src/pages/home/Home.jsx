import React from 'react';
import Footer from '../../components/templates/Footer';
import Header from '../../components/templates/Header';
import Menu from '../../components/templates/Menu';
import useIntel from '../../hooks/context/useIntel';
import './Home.css';
import GameMat from './mat/GameMat';
import StartGameMat from './mat/StartGameMat';
import WelcomeMat from './mat/WelcomeMat';

const Home = () => {
    const {intel} = useIntel()
    return (
        <div className='app'>
            <Header/>
            <Menu/>
            {!intel && <WelcomeMat/>}
            {intel && !intel.last && <StartGameMat/>}
            {intel && intel.last && <GameMat/>}
            <Footer/>
        </div>
    )
}
export default Home
