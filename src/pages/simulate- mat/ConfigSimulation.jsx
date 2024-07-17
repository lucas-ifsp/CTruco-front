import React, { useState } from "react";
import Header from "../../components/templates/Header";
import Menu from "../../components/templates/Menu";
import Footer from "../../components/templates/Footer";

const ConfigSimulation = () => {
  const [bot1, setBot1] = useState("MineiroByBueno");
  const [bot2, setBot2] = useState("DummyBot");

  return (
    <div className="app">
      <Header />
      <Menu />
      <p>SEI LA</p>
      <Footer />
    </div>
  );
};

export default ConfigSimulation;
