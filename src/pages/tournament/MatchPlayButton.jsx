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
  const [isSimulating, setIsSimulating] = useState(false);
  const [matchIndex, setMatchIndex] = useState(0);
  const getTournament = useGetTournament();
  const { championship, setChampionship } = useTournamentStatus();
  useEffect(() => {
    if (isSimulating) {
      let intervalTime = 3000;
      if (times > 1000) {
        intervalTime = 8000;
      }
      const interval = setInterval(() => {
        getTournamentResult();
      }, intervalTime);

      return () => clearInterval(interval);
    }
  }, [isSimulating]);
  const handleOpenModal = (player) => {
    setModalPlayer(player);
    onOpen();
  };

  const getTournamentResult = async () => {
    console.log(championship.uuid);
    let newTournament = await getTournament(championship.uuid);
    if (newTournament.matchesDTO[matchIndex].winnerName !== null) {
      setChampionship(newTournament);
      setIsSimulating(false);
    }
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
              setMatchIndex(2 * match.matchNumber - championship.size - 1);
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
            setMatchIndex(2 * match.matchNumber - championship.size - 2);
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
