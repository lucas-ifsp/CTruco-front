import React, { useEffect, useState } from "react";
import "./Tournament.css";
import useCreateTournament from "./useCreateTournament";
import useTournamentStatus from "../context/useTournamentStatus";
import useGetTournament from "./useGetTournament";

const Tournament = () => {
  //   [
  //     "LazyBot",
  //     "DummyBot",
  //     "MineiroByBueno",
  //     "VapoBot",
  //     "UncleBobBot",
  //     "SkolTable",
  //     "VeioDoBarBot",
  //     "W'rkncacnter"
  // ]
  const createTournament = useCreateTournament();
  const getTournament = useGetTournament();

  const createCamp = async () => {
    let camp = await createTournament();
    console.log(camp);
    console.log(camp.matchesDTO);
    setChampionship(camp);
  };

  const getCamp = async () => {
    let camp = await getTournament();
    console.log(camp);
    console.log(camp.matchesDTO);
    setChampionship(camp);
  };

  const { championship, setChampionship } = useTournamentStatus();
  // useEffect(() => {
  //   if (!championship) createCamp();
  // }, []);

  const tournament = [
    {
      matchNumber: 1,
      p1: "LazyBot",
      p2: "DummyBot",
      winner: "",
    },
    {
      matchNumber: 2,
      p1: "MineiroByBueno",
      p2: "VapoBot",
      winner: "",
    },
    {
      matchNumber: 3,
      p1: "UncleBobBot",
      p2: "SkolTable",
      winner: "",
    },
    {
      matchNumber: 4,
      p1: "VeioDoBarBot",
      p2: "W'rkncacnter",
      winner: "",
    },
    {
      matchNumber: 5,
      p1: "",
      p2: "",
      winner: "",
    },
    {
      matchNumber: 6,
      p1: "",
      p2: "",
      winner: "",
    },
    {
      matchNumber: 7,
      p1: "",
      p2: "",
      winner: "",
    },
  ];

  return (
    <main className="tournament">
      {!championship && (
        <section>
          <p>ALO</p>
        </section>
      )}
      {championship && (
        <section>
          <div className="tournament-grid mt-4 mb-3">
            <div className="match-player p1">
              <p>{championship[0].p1Name}</p>
            </div>
            <div className="b1">
              <button className="btn btn-success">Jogar</button>
            </div>
            <div className="match-player p2">
              <p>{championship[0].p2Name}</p>
            </div>
            <div className="match-player p3">
              <p>{championship[1].p1Name}</p>
            </div>
            <div className="b2">
              <button className="btn btn-success">Jogar</button>
            </div>
            <div className="match-player p4">
              <p>{championship[1].p2Name}</p>
            </div>
            <div className="match-player p5">
              <p>
                {championship[0].winnerName ? championship[0].winnerName : "?"}
              </p>
            </div>
            <div className="b3">
              <button className="btn btn-success">Jogar</button>
            </div>
            <div className="match-player p6">
              <p>
                {championship[1].winnerName ? championship[1].winnerName : "?"}
              </p>
            </div>
            <div className="match-player p7">
              <p>
                {championship[4].winnerName ? championship[4].winnerName : "?"}
              </p>
            </div>
            <div className="b4">
              <button
                className="btn btn-success"
                onClick={() => {
                  if (!championship) {
                    createCamp();
                  } else {
                    getCamp();
                  }
                }}
              >
                Jogar
              </button>
            </div>
            <div className="match-player p8">
              <p>
                {championship[5].winnerName ? championship[5].winnerName : "?"}
              </p>
            </div>
            <div className="match-player p9">
              <p>
                {championship[2].winnerName ? championship[2].winnerName : "?"}
              </p>
            </div>
            <div className="b5">
              <button className="btn btn-success">Jogar</button>
            </div>
            <div className="match-player p10">
              <p>
                {championship[3].winnerName ? tournament[3].winnerName : "?"}
              </p>
            </div>
            <div className="match-player p11">
              <p>{championship[2].p1Name}</p>
            </div>
            <div className="b6">
              <button className="btn btn-success">Jogar</button>
            </div>
            <div className="match-player p12">
              <p>{championship[2].p2Name}</p>
            </div>
            <div className="match-player p13">
              <p>{championship[3].p1Name}</p>
            </div>
            <div className="b7">
              <button className="btn btn-success">Jogar</button>
            </div>
            <div className="match-player p14">
              <p>{championship[3].p2Name}</p>
            </div>
            <div className="match-player winner">
              <p>
                {championship[6].winnerName ? championship[6].winnerName : "?"}
              </p>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default Tournament;
