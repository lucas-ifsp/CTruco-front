import React from "react";

const Match = ({
  match,
  onPlay,
}) => {
  return (
    <>
      <div className={"match-player m" + match.matchNumber + " p1"}>
        <p className="p1">{match.p1Name || "?"}</p>
        <div className={"t-score m" + match.matchNumber}>
          <p
            className={
              match.p1Score === 0 && match.p2Score === 0
                ? ""
                : match.p1Score > match.p2Score
                ? "winner"
                : "loser"
            }
          >
            {match.p1Score === 0 ? "" : match.p1Score}
          </p>
        </div>
      </div>
      <div className={"match-button m" + match.matchNumber + " b"}>
        <button
          className="btn btn-success"
          onClick={() => onPlay(match.matchNumber)}
          disabled={!(match.p1Name && match.p2Name && !match.winnerName)}
        >
          Jogar
        </button>
      </div>

      <div className={"match-player m" + match.matchNumber + " p2"}>
        <div className={"t-score m" + match.matchNumber}>
          <p
            className={
              match.p1Score === 0 && match.p2Score === 0
                ? ""
                : match.p2Score > match.p1Score
                ? "winner"
                : "loser"
            }
          >
            {match.p2Score === 0 ? "" : match.p2Score}
          </p>
        </div>
        <p className="p2">{match.p2Name || "?"}</p>
      </div>
    </>
  );
};

export default Match;
