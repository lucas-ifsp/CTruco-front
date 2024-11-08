import React, { useState, useEffect } from "react";
import useGetTournament from "./useGetTournament";
import useTournamentStatus from "../context/useTournamentStatus";
const MatchPlayButton = ({
  isP1,
  match,
  onPlay,
  times,
  onOpen,
  setModalPlayer,
}) => {
  const { championship, setIsSimulating } = useTournamentStatus();
  const handleOpenModal = (player) => {
    setModalPlayer(player);
    onOpen();
  };
  const shouldBeDisable = (isP1) => {
    if (isP1)
      return !championship.matchesDTO[
        2 * match.matchNumber - championship.size - 2
      ].available;
    return !championship.matchesDTO[
      2 * match.matchNumber - championship.size - 1
    ].available;
  };

  if (!isP1) {
    return (
      <>
        <div className={"match-play-btn m" + match.matchNumber + " p2"}>
          <button
            type="button"
            className="btn btn-dark play-btn"
            onClick={() => {
              handleOpenModal("p2");
              console.log(2 * match.matchNumber - championship.size - 1);
              setIsSimulating(true);
              onPlay(2 * match.matchNumber - championship.size, times);
            }}
            disabled={shouldBeDisable(false)}
          >
            {shouldBeDisable(false) ? "?" : "Jogar"}
          </button>
        </div>
      </>
    );
  }
  return (
    <>
      <div className={"match-play-btn m" + match.matchNumber + " p1"}>
        <button
          type="button"
          className="btn btn-dark play-btn"
          onClick={() => {
            handleOpenModal("p1");
            console.log(2 * match.matchNumber - championship.size - 2);
            setIsSimulating(true);
            onPlay(2 * match.matchNumber - championship.size - 1, times);
          }}
          disabled={shouldBeDisable(true)}
        >
          {shouldBeDisable(true) ? "?" : "Jogar"}
        </button>
      </div>
    </>
  );
};

export default MatchPlayButton;
