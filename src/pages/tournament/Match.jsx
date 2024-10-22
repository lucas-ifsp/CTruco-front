import React, { useState } from "react";
import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import MatchModal from "./MatchModal";
import MatchPlayer from "./MatchPlayer";
import MatchPlayButton from "./MatchPlayButton";
import "./Match.css";

const Match = ({ match, onPlay, camp, times }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalPlayer, setModalPlayer] = useState(null);

  return (
    <>
      {match.p1Name && <MatchPlayer isP1={true} match={match} camp={camp} />}
      {!match.p1Name && (
        <MatchPlayButton
          isP1={true}
          match={match}
          onPlay={onPlay}
          onOpen={onOpen}
          camp={camp}
          times={times}
          setModalPlayer={setModalPlayer}
        />
      )}
      {match.p2Name && <MatchPlayer isP1={false} match={match} camp={camp} />}
      {!match.p2Name && (
        <MatchPlayButton
          isP1={false}
          match={match}
          onPlay={onPlay}
          onOpen={onOpen}
          camp={camp}
          times={times}
          setModalPlayer={setModalPlayer}
        />
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
