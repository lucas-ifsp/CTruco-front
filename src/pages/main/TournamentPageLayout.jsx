import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/templates/Header";
import Footer from "../../components/templates/Footer";
import "./TournamentPageLayout.css";

const TournamentPageLayout = () => {
  return (
    <div className="app-tournament">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default TournamentPageLayout;
