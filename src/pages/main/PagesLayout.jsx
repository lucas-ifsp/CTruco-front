import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/templates/Header";
import Footer from "../../components/templates/Footer";
import "./PagesLayout.css";
import Menu from "../../components/templates/Menu";

const PagesLayout = () => {
  return (
    <div className="app">
      <Header />
      <Menu />
      <Outlet />
      <Footer />
    </div>
  );
};

export default PagesLayout;
