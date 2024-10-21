import React, { useEffect, useState } from "react";
import { ChakraProvider, Input } from "@chakra-ui/react";
import TransferListFragment from "./TransferListFragment";
import "./TournamentConfig.css";
import useGetBotNames from "../../hooks/api/useGetBotNames";
import useTournamentStatus from "../context/useTournamentStatus";
import useCreateTournament from "./useCreateTournament";
import { useNavigate } from "react-router-dom";

const TournamentConfig = () => {
  const [l1Bots, setL1Bots] = useState([]);
  const [l2Bots, setL2Bots] = useState([]);
  const { championship, setChampionship, setFinalMatchTimes, times, setTimes } =
    useTournamentStatus();
  const fetchBotNames = useGetBotNames();
  const createTournament = useCreateTournament();
  const navigate = useNavigate();

  const [tranferedFromL1, setTranferedFromL1] = useState([]);
  const [tranferedFromL2, setTranferedFromL2] = useState([]);

  const updateBotsList = async () => {
    const response = await fetchBotNames();
    const data = await response.data.sort();
    setL1Bots(data);
  };

  const handleLoading = () => {
    if (championship) {
      navigate("/tournament", {});
    }
    updateBotsList();
  };

  useEffect(() => {
    setTimes(31);
    setFinalMatchTimes(31);
  }, []);
  useEffect(() => {
    handleLoading();
  }, [championship]);

  useEffect(() => {
    let botsList2 = [...l2Bots];
    tranferedFromL1.forEach((bot) => botsList2.push(bot));
    setL2Bots(botsList2.sort());
  }, [tranferedFromL1]);

  useEffect(() => {
    let botsList1 = [...l1Bots];
    tranferedFromL2.forEach((bot) => botsList1.push(bot));
    setL1Bots(botsList1.sort());
  }, [tranferedFromL2]);

  const createCamp = async (bots, times) => {
    let camp = await createTournament(bots, times);
    console.log(camp);
    setChampionship(camp);

    navigate("/tournament");
  };

  return (
    <main className="tournament-config">
      <section>
        <form>
          <TransferListFragment
            content={l1Bots}
            transferButtonArrowDirection="right"
            className={"l1"}
            setTransferedContent={setTranferedFromL1}
          ></TransferListFragment>

          <TransferListFragment
            content={l2Bots}
            transferButtonArrowDirection="left"
            className={"l2"}
            setTransferedContent={setTranferedFromL2}
          ></TransferListFragment>

          <div id="lower-container">
            <ChakraProvider>
              <label htmlFor="nbr-simu">Número de simulações</label>
              <Input
                type="number"
                onChange={(e) => {
                  if (e.target.value > 5000) {
                    e.target.value = 5000;
                  }
                  if (e.target.value <= 0) {
                    e.target.value = 1;
                  }
                  setTimes(e.target.value);
                }}
                id="nbr-simu"
                name="nbr-simu"
              />
              <label htmlFor="nbr-simu">Final e de Terceiro Lugar</label>
              <Input
                type="number"
                onChange={(e) => {
                  if (e.target.value > 5000) {
                    e.target.value = 5000;
                  }
                  if (e.target.value <= 0) {
                    e.target.value = 1;
                  }
                  setFinalMatchTimes(e.target.value);
                }}
                id="nbr-simu"
                name="nbr-simu"
              />
            </ChakraProvider>

            <div id="create-camp-btn">
              <p
                style={{ color: "red", fontSize: "12px", margin: "0px" }}
                hidden={l2Bots.length === 8 || l2Bots.length === 16}
              >
                Devem ser selecionados 8 ou 16
              </p>

              <button
                type="submit"
                className="btn btn-dark"
                onClick={(e) => {
                  e.preventDefault();
                  createCamp(l2Bots, times);
                }}
                disabled={l2Bots.length !== 8 && l2Bots.length !== 16}
              >
                Começar Torneio
              </button>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
};

export default TournamentConfig;
