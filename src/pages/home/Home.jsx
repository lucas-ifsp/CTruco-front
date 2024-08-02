import React from "react";
import Footer from "../../components/templates/Footer";
import Header from "../../components/templates/Header";
import Menu from "../../components/templates/Menu";
import "./Home.css";
import WelcomeMat from "./mat/WelcomeMat";

const Home = () => {
  return (
    <div className="app">
      <Header />
      <Menu />
      <WelcomeMat />
      <Footer />
    </div>
  );
};
export default Home;
