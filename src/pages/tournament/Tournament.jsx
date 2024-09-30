import React, { useEffect } from "react";
import Match from "./Match";
import "./Tournament.css";
import "./Tournament-8.css";
import "./Tournament-16.css";
import useTournamentStatus from "../context/useTournamentStatus";
import usePlayTournamentMatch from "./usePlayTournamentMatch";
import { useNavigate } from "react-router-dom";

const Tournament = () => {
  const play = usePlayTournamentMatch();
  const navigate = useNavigate();
  const { championship, setChampionship } = useTournamentStatus();

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
          <div class="alert alert-info info-simulacoes" role="alert">
            Simulações por Partida: {championship.times}
          </div>

          {championship.matchesDTO.map((match) => (
            <Match
              campSize={championship.matchesDTO.length + 1}
              match={match}
              onPlay={playCampMatch}
            />
          ))}

          <div className="match-player winner">
            <p>{championship.winnerName || "?"}</p>
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
