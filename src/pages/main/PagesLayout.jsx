import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Menu from "../../components/templates/Menu";
import Header from "../../components/templates/Header";
import Footer from "../../components/templates/Footer";
import "./PagesLayout.css";
import { EvaluationProvider } from "../evaluate-bot/EvaluateContext";
import { TournamentProvider } from "../tournament/TournamentProvider";

const PagesLayout = () => {
  return (
    <div className="app">
      <Header />
      <Menu />
      <EvaluationProvider>
        <TournamentProvider>
          <Outlet />
        </TournamentProvider>
      </EvaluationProvider>
      <Footer />
    </div>
  );
};

export default PagesLayout;
