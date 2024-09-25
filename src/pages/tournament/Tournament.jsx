import React from "react";
import Match from "./Match";
import "./Tournament.css";

const Tournament = () => {
  return (
    <main>
      <section className="tournament-grid">
        <Match matchNumber="m1"></Match>
        <Match matchNumber="m2"></Match>
        <Match matchNumber="m3"></Match>
      </section>
    </main>
  );
};

export default Tournament;
