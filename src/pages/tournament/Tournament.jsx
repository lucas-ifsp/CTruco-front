import React, { useEffect } from "react";
import Match from "./Match";
import MatchModal from "./MatchModal";
import "./Tournament.css";
import "./Tournament-8.css";
import "./Tournament-16.css";
import useTournamentStatus from "../context/useTournamentStatus";
import usePlayTournamentMatch from "./usePlayTournamentMatch";
import { useNavigate } from "react-router-dom";
import { ChakraProvider, useDisclosure } from "@chakra-ui/react";

const Tournament = () => {
  const play = usePlayTournamentMatch();
  const navigate = useNavigate();
  const { championship, setChampionship } = useTournamentStatus();
  const { onOpen, isOpen, onClose } = useDisclosure();

  const playCampMatch = async (matchNumber) => {
    let camp = await play(championship.uuid, matchNumber);
    console.log(camp);
    setChampionship(camp);
  };

  useEffect(() => {
    if (!championship) {
      navigate("/tournament/config");
    }
  }, []);

  useEffect(() => {
    if (!championship) {
      navigate("/tournament/config");
    }
  }, [championship]);

  return (
    <main
      className={"tournament " + "s" + (championship.matchesDTO.length + 1)}
    >
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
        <div className="tournament-grid mt-4 mb-3">
          <div className="alert alert-info info-simulacoes" role="alert">
            Simulações por Partida: {championship.times}
          </div>

          {championship.matchesDTO.map((match) => (
            <Match
              key={match.uuid}
              campSize={championship.size}
              match={match}
              onPlay={playCampMatch}
            />
          ))}

          <div className="match-player winner">
            {!championship.winnerName && (
              <>
                <button
                  className="btn btn-dark"
                  onClick={() => {
                    onOpen();
                    playCampMatch(championship.size - 1);
                  }}
                >
                  ?
                </button>
                <ChakraProvider>
                  <MatchModal
                    isOpen={isOpen}
                    match={championship.matchesDTO[championship.size - 2]}
                    onClose={onClose}
                  ></MatchModal>
                </ChakraProvider>
              </>
            )}
            {championship.winnerName && <p>{championship.winnerName}</p>}
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
