import React, { useEffect, useState } from "react";
import Match from "./Match";
import MatchModal from "./MatchModal";
import "./Tournament.css";
import "./Tournament-8.css";
import "./Tournament-16.css";
import useTournamentStatus from "../context/useTournamentStatus";
import usePlayTournamentMatch from "./usePlayTournamentMatch";
import useGetTournament from "./useGetTournament";
import { useNavigate } from "react-router-dom";
import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import medalhaOuro from "../../assets/images/medals/gold_medal-removebg.png";
import medalhaBronze from "../../assets/images/medals/bronze_medal-removebg.png";
import trophy from "../../assets/images/medals/trophy.png";

const Tournament = () => {
  const play = usePlayTournamentMatch();
  const getTournament = useGetTournament();
  const navigate = useNavigate();
  const {
    title,
    championship,
    setChampionship,
    times,
    finalMatchTimes,
    setIsSimulating,
    isSimulating,
    matchIndex,
    setMatchIndex,
  } = useTournamentStatus();
  const { matchesDTO } = championship;
  const { onOpen, isOpen, onClose } = useDisclosure();

  const playCampMatch = async (matchNumber, times) => {
    let response = await play(championship.uuid, matchNumber, times);
  };

  const shouldBeDisableThirdPlaceMatch = () => {
    return !championship.matchesDTO[championship.size - 1].available;
  };

  const shouldBeDisableFinalMatch = () => {
    return !championship.matchesDTO[championship.size - 2].available;
  };

  const getTournamentResult = async () => {
    // console.log("isSimulating: " + isSimulating);
    let newTournament = await getTournament(championship.uuid);
    if (newTournament.matchesDTO[matchIndex].winnerName !== null) {
      setChampionship(newTournament);
      setIsSimulating(false);
    }
    setTimeout(async () => {
      let updatedTournament = await getTournament(championship.uuid);
      if (updatedTournament.matchesDTO[matchIndex].winnerName !== null) {
        // console.log("dnv");
        setChampionship(updatedTournament);
        setIsSimulating(false);
      }
    }, 2000);
  };

  useEffect(() => {
    let intervalTime = 1000;

    if (isSimulating) {
      intervalTime = 3000;
    } else {
      intervalTime = 15000;
    }

    const interval = setInterval(() => {
      getTournamentResult();
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isSimulating]);

  useEffect(() => {
    if (!championship) {
      navigate("/tournament/config");
    }
  }, [championship]);

  return (
    <ChakraProvider>
      <main className={"tournament " + "s" + matchesDTO.length}>
        <section>
          {!championship.winnerName && (
            <button
              className="btn btn-danger"
              onClick={() => {
                setChampionship();
                navigate("/tournament/config");
              }}
            >
              Cancelar
            </button>
          )}

          {championship.winnerName && (
            <button
              className="btn btn-warning"
              onClick={() => {
                setChampionship();
                navigate("/tournament/config");
              }}
            >
              Voltar
            </button>
          )}
          <div className="tournament-grid mb-3">
            <img
              src={trophy}
              alt="Championship Trophy"
              id="tournament-trophy"
            />
            <p id="tournament-title">{title}</p>
            {championship.matchesDTO.map((match) => {
              return (
                <Match
                  key={match.uuid}
                  match={match}
                  onPlay={playCampMatch}
                  getTournamentResult={getTournamentResult}
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
                    setIsSimulating(true);
                    setMatchIndex(championship.size - 2);
                  }}
                  disabled={shouldBeDisableFinalMatch()}
                >
                  {shouldBeDisableFinalMatch() ? "?" : "Jogar"}
                </button>
              </div>
            )}
            <MatchModal
              isOpen={isOpen}
              match={championship.matchesDTO[matchIndex]}
              onClose={onClose}
            />
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
            {!championship.matchesDTO[championship.size - 1].winnerName && (
              <div className="match-play-btn third-place">
                <button
                  className="btn btn-dark play-btn"
                  onClick={() => {
                    onOpen();
                    playCampMatch(championship.size, finalMatchTimes);
                    setIsSimulating(true);
                    setMatchIndex(championship.size - 1);
                  }}
                  disabled={shouldBeDisableThirdPlaceMatch()}
                >
                  {shouldBeDisableThirdPlaceMatch() ? "?" : "Jogar"}
                </button>
              </div>
            )}
            {championship.matchesDTO[championship.size - 1].winnerName && (
              <div className="match-player third-place">
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
              </div>
            )}
          </div>
        </section>
      </main>
    </ChakraProvider>
  );
};

export default Tournament;
