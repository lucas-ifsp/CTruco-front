import React from "react";

const Match = ({
  p1Name,
  p2Name,
  p1Score,
  p2Score,
  matchNumber,
  onPlay,
  disabled,
}) => {
  return (
    <>
      <div className={"match-player m" + matchNumber + " p1"}>
        <p className="p1">{p1Name || "?"}</p>
        <div className={"t-score m" + matchNumber}>
          <p
            className={
              p1Score === 0 && p2Score === 0
                ? ""
                : p1Score > p2Score
                ? "winner"
                : "loser"
            }
          >
            {p1Score === 0 ? "" : p1Score}
          </p>
        </div>
      </div>
      <div className={"match-button m" + matchNumber + " b"}>
        <button
          className="btn btn-success"
          onClick={() => onPlay(matchNumber)}
          disabled={disabled}
        >
          Jogar
        </button>
      </div>

      <div className={"match-player m" + matchNumber + " p2"}>
        <div className={"t-score m" + matchNumber}>
          <p
            className={
              p1Score === 0 && p2Score === 0
                ? ""
                : p2Score > p1Score
                ? "winner"
                : "loser"
            }
          >
            {p2Score === 0 ? "" : p2Score}
          </p>
        </div>
        <p className="p2">{p2Name || "?"}</p>
      </div>
    </>
  );
};

export default Match;
