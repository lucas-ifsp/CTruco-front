import React from "react";
import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import MatchModal from "./MatchModal";

const Match = ({ match, onPlay, campSize }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        <div className={"match-player m" + match.matchNumber + " p1"}>
          <button
            className="btn btn-dark"
            onClick={() => {
              onOpen();
              onPlay(2 * match.matchNumber - campSize - 1);
            }}
          >
            ?
          </button>
        </div>
      )}
      <div className={"match-button m" + match.matchNumber + " b"}>
        <button
          className="btn btn-success"
          onClick={() => {
            onOpen();
            onPlay(match.matchNumber);
          }}
          disabled={!(match.p1Name && match.p2Name && !match.winnerName)}
        >
          Jogar
        </button>
      </div>
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
        <div className={"match-player m" + match.matchNumber + " p2"}>
          <button
            className="btn btn-dark"
            onClick={() => {
              onOpen();
              onPlay(2 * match.matchNumber - campSize);
            }}
          >
            ?
          </button>
        </div>
      )}
      <ChakraProvider>
        <MatchModal
          isOpen={isOpen}
          match={match}
          onClose={onClose}
        ></MatchModal>
      </ChakraProvider>
    </>
  );
};

export default Match;
