import React, { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import MatchModal from "./MatchModal";
import MatchPlayer from "./MatchPlayer";
import MatchPlayButton from "./MatchPlayButton";
import useTournamentStatus from "../context/useTournamentStatus";
import "./Match.css";

const Match = ({ match, onPlay }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalPlayer, setModalPlayer] = useState(null);
  const { championship, setChampionship, times } = useTournamentStatus();

  return (
    <>
      {match.p1Name && (
        <MatchPlayer isP1={true} match={match} camp={championship} />
      )}
      {!match.p1Name && (
        <MatchPlayButton
          isP1={true}
          match={match}
          onPlay={onPlay}
          onOpen={onOpen}
          times={times}
          setModalPlayer={setModalPlayer}
        />
      )}
      {match.p2Name && (
        <MatchPlayer isP1={false} match={match} camp={championship} />
      )}
      {!match.p2Name && (
        <MatchPlayButton
          isP1={false}
          match={match}
          onPlay={onPlay}
          onOpen={onOpen}
          times={times}
          setModalPlayer={setModalPlayer}
        />
      )}
      {modalPlayer === "p1" && (
        <MatchModal
          isOpen={isOpen}
          //puxa a partida que define o p1
          match={
            championship.matchesDTO[
              2 * match.matchNumber - championship.size - 2
            ]
          }
          onClose={onClose}
        />
      )}
      {modalPlayer === "p2" && (
        <MatchModal
          isOpen={isOpen}
          //puxa a partida que define o p2
          match={
            championship.matchesDTO[
              2 * match.matchNumber - championship.size - 1
            ]
          }
          onClose={onClose}
        />
      )}
    </>
  );
};

export default Match;
