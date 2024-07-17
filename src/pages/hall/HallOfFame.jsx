import React from "react";
import Header from "../../components/templates/Header";
import Menu from "../../components/templates/Menu";
import Footer from "../../components/templates/Footer";
import "../home/Home.css"

const HallOfFame = () => {
  return (
    <div className="app">
      <Header />
      <Menu />
      <p className="cs-feat">Hall Of Fame - Comming Soon</p>
      <Footer />
    </div>
  );
};

export default HallOfFame;
