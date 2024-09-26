import React, { useEffect } from "react";
import Match from "./Match";
import "./Tournament.css";
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
    <main className="tournament">
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
          <Match
            p1Name={championship.matchesDTO[0]?.p1Name}
            p2Name={championship.matchesDTO[0]?.p2Name}
            p1Score={championship.matchesDTO[0]?.p1Score}
            p2Score={championship.matchesDTO[0]?.p2Score}
            matchNumber={1}
            onPlay={playCampMatch}
            disabled={championship.matchesDTO[0].winnerName}
          />
          <Match
            p1Name={championship.matchesDTO[1]?.p1Name}
            p2Name={championship.matchesDTO[1]?.p2Name}
            p1Score={championship.matchesDTO[1]?.p1Score}
            p2Score={championship.matchesDTO[1]?.p2Score}
            matchNumber={2}
            onPlay={playCampMatch}
            disabled={championship.matchesDTO[1].winnerName}
          />
          <Match
            p1Name={championship.matchesDTO[2]?.p1Name}
            p2Name={championship.matchesDTO[2]?.p2Name}
            p1Score={championship.matchesDTO[2]?.p1Score}
            p2Score={championship.matchesDTO[2]?.p2Score}
            matchNumber={3}
            onPlay={playCampMatch}
            disabled={championship.matchesDTO[2].winnerName}
          />
          <Match
            p1Name={championship.matchesDTO[3]?.p1Name}
            p2Name={championship.matchesDTO[3]?.p2Name}
            p1Score={championship.matchesDTO[3]?.p1Score}
            p2Score={championship.matchesDTO[3]?.p2Score}
            matchNumber={4}
            onPlay={playCampMatch}
            disabled={championship.matchesDTO[3].winnerName}
          />

          {/* Semifinais e finais */}
          <Match
            p1Name={championship.matchesDTO[0]?.winnerName || "?"}
            p2Name={championship.matchesDTO[1]?.winnerName || "?"}
            p1Score={championship.matchesDTO[4]?.p1Score}
            p2Score={championship.matchesDTO[4]?.p2Score}
            matchNumber={5}
            onPlay={playCampMatch}
            disabled={
              !championship.matchesDTO[0]?.winnerName ||
              !championship.matchesDTO[1]?.winnerName ||
              championship.matchesDTO[4].winnerName
            }
          />
          <Match
            p1Name={championship.matchesDTO[2]?.winnerName || "?"}
            p2Name={championship.matchesDTO[3]?.winnerName || "?"}
            p1Score={championship.matchesDTO[5]?.p1Score}
            p2Score={championship.matchesDTO[5]?.p2Score}
            matchNumber={6}
            onPlay={playCampMatch}
            disabled={
              !championship.matchesDTO[2]?.winnerName ||
              !championship.matchesDTO[3]?.winnerName ||
              championship.matchesDTO[5].winnerName
            }
          />
          <Match
            p1Name={championship.matchesDTO[4]?.winnerName || "?"}
            p2Name={championship.matchesDTO[5]?.winnerName || "?"}
            p1Score={championship.matchesDTO[6]?.p1Score}
            p2Score={championship.matchesDTO[6]?.p2Score}
            matchNumber={7}
            onPlay={playCampMatch}
            disabled={
              !championship.matchesDTO[4]?.winnerName ||
              !championship.matchesDTO[5]?.winnerName ||
              championship.matchesDTO[6].winnerName
            }
          />
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
