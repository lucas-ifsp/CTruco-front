import React from "react";
import Header from "../../../components/templates/Header";
import Menu from "../../../components/templates/Menu";
import Footer from "../../../components/templates/Footer";
import "./AddRemote.css";
import "../Home.css"

const AddRemote = () => {
  return (
    <div className="app">
      <Header />
      <Menu />
      <p className="cs-feat">CRUD Remote - Comming Soon</p>
      <Footer />
    </div>
  );
};

export default AddRemote;
