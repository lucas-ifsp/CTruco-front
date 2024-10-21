import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/templates/Header";
import Footer from "../../components/templates/Footer";
import "./PagesLayout.css";
import { EvaluationProvider } from "../evaluate-bot/EvaluateContext";
import Menu from "../../components/templates/Menu";

const PagesLayout = () => {
  return (
    <div className="app">
      <EvaluationProvider>
        <Header />
        <Menu />
        <Outlet />
        <Footer />
      </EvaluationProvider>
    </div>
  );
};

export default PagesLayout;
