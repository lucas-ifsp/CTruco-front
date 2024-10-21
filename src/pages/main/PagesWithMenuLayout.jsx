import React from "react";
import { Outlet } from "react-router-dom";
import Menu from "../../components/templates/Menu";
import "./PagesLayout.css";

const PagesWithMenuLayout = () => {
  return (
    <div className="page-content">
      <Menu />
      <Outlet />
    </div>
  );
};

export default PagesWithMenuLayout;
