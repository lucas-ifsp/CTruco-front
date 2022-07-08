import React from "react";
import Footer from "../components/templates/Footer";
import Header from "../components/templates/Header";
import Mat from "../components/game/Mat";
import Menu from "../components/templates/Menu";
import "./App.css"

const App = props => 
        <div className="app">
            <Header/>
            <Menu/>
            <Mat/>
            <Footer/>
        </div>

export default App;
