import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Menu from "../../components/templates/Menu";
import Header from "../../components/templates/Header";
import Footer from "../../components/templates/Footer";
import "./PagesLayout.css";
import { EvaluationProvider } from "../evaluate-bot/EvaluateContext";

const PagesLayout = () => {
  return (
    <div className="app">
      <Header />
      <Menu />
      <EvaluationProvider>
        <Outlet />
      </EvaluationProvider>
      <Footer />
    </div>
  );
};

export default PagesLayout;
