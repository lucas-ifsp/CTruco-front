import React, { useEffect, useState } from "react";
import Match from "./Match";
import MatchModal from "./MatchModal";
import "./Tournament.css";
import "./Tournament-8.css";
import "./Tournament-16.css";
import useTournamentStatus from "../context/useTournamentStatus";
import usePlayTournamentMatch from "./usePlayTournamentMatch";
import { useNavigate } from "react-router-dom";
import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import medalhaOuro from "../../assets/images/medals/gold_medal-removebg.png";
import medalhaBronze from "../../assets/images/medals/bronze_medal-removebg.png";

const Tournament = () => {
  const play = usePlayTournamentMatch();
  const navigate = useNavigate();
  const { championship, setChampionship, times, finalMatchTimes } =
    useTournamentStatus();
  const { matchesDTO } = championship;
  const { onOpen, isOpen, onClose } = useDisclosure();

  const playCampMatch = async (matchNumber, times) => {
    let camp = await play(championship.uuid, matchNumber, times);
    setChampionship(camp);
  };

  useEffect(() => {
    if (!championship) {
      navigate("/tournament/config");
    }
  }, [championship]);

  return (
    <main className={"tournament " + "s" + matchesDTO.length}>
      <section>
        <button
          className="btn btn-danger"
          onClick={() => {
            setChampionship("");
            navigate("/tournament/config");
          }}
        >
          Cancelar
        </button>
        <div className="tournament-grid mb-3">
          {championship.matchesDTO.map((match) => {
            return (
              <Match
                key={match.uuid}
                campSize={championship.size}
                match={match}
                allMatches={championship.matchesDTO}
                camp={championship}
                times={times}
                onPlay={playCampMatch}
              />
            );
          })}

          <p id="tournament-winner-label">Final</p>
          {!championship.winnerName && (
            <div className="match-play-btn winner">
              <button
                className="btn btn-dark play-btn"
                onClick={() => {
                  onOpen();
                  playCampMatch(championship.size - 1, finalMatchTimes);
                }}
                disabled={
                  !championship.matchesDTO[championship.size - 2].available
                }
              >
                Jogar
              </button>
              <ChakraProvider>
                <MatchModal
                  isOpen={isOpen}
                  match={championship.matchesDTO[championship.size - 2]}
                  onClose={onClose}
                ></MatchModal>
              </ChakraProvider>
            </div>
          )}
          {championship.winnerName && (
            <div className="match-player winner">
              <div className="winner-info">
                <img
                  src={medalhaOuro}
                  alt="gold medal for the tournament winner"
                  width="20px"
                />
                <p>{championship.winnerName}</p>
              </div>
            </div>
          )}

          <p id="third-place-label">Terceiro Lugar</p>
          <div className="match-play-btn third-place">
            {!championship.matchesDTO[championship.size - 1].winnerName && (
              <>
                <button
                  className="btn btn-dark play-btn"
                  onClick={() => {
                    onOpen();
                    playCampMatch(championship.size, finalMatchTimes);
                  }}
                  disabled={
                    !championship.matchesDTO[championship.size - 1].available
                  }
                >
                  Jogar
                </button>
                <ChakraProvider>
                  <MatchModal
                    isOpen={isOpen}
                    match={championship.matchesDTO[championship.size - 1]}
                    onClose={onClose}
                  ></MatchModal>
                </ChakraProvider>
              </>
            )}
            {championship.matchesDTO[championship.size - 1].winnerName && (
              <div className="winner-info">
                <img
                  src={medalhaBronze}
                  alt="gold medal for the tournament winner"
                  width="20px"
                />
                <p>
                  {championship.matchesDTO[championship.size - 1].winnerName}
                </p>
              </div>
            )}
          </div>

          {championship.winnerName && (
            <button
              className="btn btn-warning reset b"
              onClick={() => {
                setChampionship();
                navigate("/tournament/config");
              }}
            >
              Novo Torneio
            </button>
          )}
        </div>
      </section>
    </main>
  );
};

export default Tournament;
