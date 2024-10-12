import React, { useState } from "react";
import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import MatchModal from "./MatchModal";
import "./Match.css";

const Match = ({ match, onPlay, camp, times }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalPlayer, setModalPlayer] = useState(null);

  const handleOpenModal = (player) => {
    setModalPlayer(player);
    onOpen();
  };

  return (
    <>
      {match.p1Name && (
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
      )}
      {!match.p1Name && (
        <>
          <div className={"match-player m" + match.matchNumber + " p1"}>
            <button
              className="btn btn-warning play-btn"
              onClick={() => {
                handleOpenModal("p1");
                onPlay(2 * match.matchNumber - camp.size - 1, times);
              }}
              disabled={
                !camp.matchesDTO[2 * match.matchNumber - camp.size - 2]
                  .available
              }
            >
              ?
            </button>
          </div>
        </>
      )}
      {match.p2Name && (
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
      )}
      {!match.p2Name && (
        <>
          <div className={"match-player m" + match.matchNumber + " p2"}>
            <button
              className="btn btn-warning play-btn"
              onClick={() => {
                handleOpenModal("p2");
                onPlay(2 * match.matchNumber - camp.size, times);
              }}
              disabled={
                !camp.matchesDTO[2 * match.matchNumber - camp.size - 1]
                  .available
              }
            >
              ?
            </button>
          </div>
        </>
      )}

      <ChakraProvider>
        {modalPlayer === "p1" && (
          <MatchModal
            isOpen={isOpen}
            //puxa a partida que define o p1
            match={camp.matchesDTO[2 * match.matchNumber - camp.size - 2]}
            onClose={onClose}
          />
        )}
        {modalPlayer === "p2" && (
          <MatchModal
            isOpen={isOpen}
            //puxa a partida que define o p2
            match={camp.matchesDTO[2 * match.matchNumber - camp.size - 1]}
            onClose={onClose}
          />
        )}
      </ChakraProvider>
    </>
  );
};

export default Match;
