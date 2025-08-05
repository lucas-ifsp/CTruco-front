import React, { useEffect, useState } from "react";

const MatchPlayer = ({ isP1, match, camp }) => {
  const [percentage, setPercentage] = useState(0);
  const setIfPlayerIsWinner = (score, opponentScore) => {
    if (score === 0 && opponentScore === 0) return "";
    return score > opponentScore ? "winner" : "loser";
  };
  const scoreShouldBeOnRight = () => {
    if (camp.size === 16) {
      if (match.matchNumber <= 4) return false;
      if (
        match.matchNumber === 9 ||
        match.matchNumber === 10 ||
        match.matchNumber === 13
      )
        return false;
      if (match.matchNumber > 14) {
        if (isP1) return false;
        return true;
      }
      return true;
    }
    // if(camp.size === 8)
    else {
      if (match.matchNumber <= 2) return false;
      if (match.matchNumber === 5) return false;
      if (match.matchNumber > 6) {
        if (isP1) return false;
        return true;
      }
      return true;
    }
  };

  const calculatesP1Percentage = () => {
    let total = match.p1Score + match.p2Score;
    if (total === 0) return 0;
    setPercentage((match.p1Score / total) * 100);
  };
  const calculatesP2Percentage = () => {
    let total = match.p1Score + match.p2Score;
    if (total === 0) return 0;
    setPercentage((match.p2Score / total) * 100);
  };

  useEffect(() => {
    if (isP1) calculatesP1Percentage();
    else calculatesP2Percentage();
  }, [match.p1Score, match.p2Score]);

  if (!isP1) {
    if (scoreShouldBeOnRight()) {
      return (
        <div className={"match-player m" + match.matchNumber + " p2"}>
          <p style={match.p2Name.length >= 14 ? { fontSize: "9px" } : {}}>
            {match.p2Name}
          </p>
          <div className={"t-score m" + match.matchNumber}>
            <p className={setIfPlayerIsWinner(match.p2Score, match.p1Score)}>
              {percentage === 0 ? "" : percentage.toFixed(1) + "%"}
            </p>
          </div>
        </div>
      );
    }
    return (
      <div className={"match-player m" + match.matchNumber + " p2"}>
        <div className={"t-score m" + match.matchNumber}>
          <p className={setIfPlayerIsWinner(match.p2Score, match.p1Score)}>
            {percentage === 0 ? "" : percentage.toFixed(1) + "%"}
          </p>
        </div>
        <p style={match.p2Name.length >= 14 ? { fontSize: "9px" } : {}}>
          {match.p2Name}
        </p>
      </div>
    );
  }

  if (scoreShouldBeOnRight()) {
    return (
      <div className={"match-player m" + match.matchNumber + " p1"}>
        <p style={match.p1Name.length > 15 ? { fontSize: "9px" } : {}}>
          {match.p1Name}
        </p>
        <div className={"t-score m" + match.matchNumber}>
          <p className={setIfPlayerIsWinner(match.p1Score, match.p2Score)}>
            {percentage === 0 ? "" : percentage.toFixed(1) + "%"}
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className={"match-player m" + match.matchNumber + " p1"}>
      <div className={"t-score m" + match.matchNumber}>
        <p className={setIfPlayerIsWinner(match.p1Score, match.p2Score)}>
          {percentage === 0 ? "" : percentage.toFixed(1) + "%"}
        </p>
      </div>
      <p style={match.p1Name.length > 15 ? { fontSize: "9px" } : {}}>
        {match.p1Name || "?"}
      </p>
    </div>
  );
};

export default MatchPlayer;
