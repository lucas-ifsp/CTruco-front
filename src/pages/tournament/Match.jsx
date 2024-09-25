import React from "react";
import "./Match.css";

const Match = ({ matchNumber }) => {
  return (
    <div className={`match-container ${matchNumber}`}>
      <div className="match-player">
        <p>PARTIDA</p>
      </div>
      <div>
        <button className="btn btn-success">Jogar</button>
      </div>
      <div className="match-player">
        <p>PARTIDA</p>
      </div>
    </div>
  );
};

export default Match;
