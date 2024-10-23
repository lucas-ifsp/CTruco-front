import React from "react";

const MatchPlayer = ({ isP1, match, camp }) => {
  const setPlayerState = (score, opponentScore) => {
    if (score === 0 && opponentScore === 0) return "";
    return score > opponentScore ? "winner" : "loser";
  };
  const shouldBeScoreOnRight = () => {
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

  if (!isP1) {
    if (shouldBeScoreOnRight()) {
      return (
        <div className={"match-player m" + match.matchNumber + " p2"}>
          <p style={match.p2Name.length >= 14 ? { fontSize: "9px" } : {}}>
            {match.p2Name}
          </p>
          <div className={"t-score m" + match.matchNumber}>
            <p className={setPlayerState(match.p2Score, match.p1Score)}>
              {match.p2Score === 0 ? "" : match.p2Score}
            </p>
          </div>
        </div>
      );
    }
    return (
      <div className={"match-player m" + match.matchNumber + " p2"}>
        <div className={"t-score m" + match.matchNumber}>
          <p className={setPlayerState(match.p2Score, match.p1Score)}>
            {match.p2Score === 0 ? "" : match.p2Score}
          </p>
        </div>
        <p style={match.p2Name.length >= 14 ? { fontSize: "9px" } : {}}>
          {match.p2Name}
        </p>
      </div>
    );
  }

  if (shouldBeScoreOnRight()) {
    return (
      <div className={"match-player m" + match.matchNumber + " p1"}>
        <p style={match.p1Name.length > 15 ? { fontSize: "9px" } : {}}>
          {match.p1Name}
        </p>
        <div className={"t-score m" + match.matchNumber}>
          <p className={setPlayerState(match.p1Score, match.p2Score)}>
            {match.p1Score === 0 ? "" : match.p1Score}
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className={"match-player m" + match.matchNumber + " p1"}>
      <div className={"t-score m" + match.matchNumber}>
        <p className={setPlayerState(match.p1Score, match.p2Score)}>
          {match.p1Score === 0 ? "" : match.p1Score}
        </p>
      </div>
      <p style={match.p1Name.length > 15 ? { fontSize: "9px" } : {}}>
        {match.p1Name || "?"}
      </p>
    </div>
  );
};

export default MatchPlayer;
