import React, { useEffect, useState } from "react";
import BotsTable from "../mat/BotsTable";
import "./ConfigSimulation.css";
import { ChakraProvider, Spinner, Input } from "@chakra-ui/react";
import useEvaluateStatus from "../context/useEvaluateStatus";
import useGetBotNames from "../../hooks/api/useGetBotNames";
import useSimulateBots from "../../hooks/api/useSimulateBots";

const ConfigSimulation = () => {
  const [bot1, setBot1] = useState("MineiroByBueno");
  const [bot2, setBot2] = useState("DummyBot");
  const [times, setTimes] = useState(1);
  const [botsList, setBotsList] = useState([]);
  const [botsToShowT1, setBotsToShowT1] = useState(botsList);
  const [botsToShowT2, setBotsToShowT2] = useState(botsList);
  const [bot1Wins, setBot1Wins] = useState(0);
  const [bot2Wins, setBot2Wins] = useState(0);
  const fetchBotNames = useGetBotNames();
  const startSimulation = useSimulateBots();
  const {
    isSimulating,
    setIsSimulating,
    simulationResult,
    setSimulationResult,
  } = useEvaluateStatus();

  useEffect(() => {
    if (simulationResult) {
      console.log(simulationResult);
      // setBot1(simulationResult.bot1Name);
      // setBot2(simulationResult.bot2Name);
      setBot1Wins(simulationResult.bot1Wins);
      setBot2Wins(simulationResult.bot2Wins);
    }
  }, [simulationResult]);

  const updateBotsList = async () => {
    const response = await fetchBotNames();
    const data = await response.data.sort();
    setBotsList(data);
  };

  useEffect(() => {
    updateBotsList();
  }, []);

  const handleInputChangeT1 = (target) => {
    const content = target.value;
    const newBotsList = botsList.filter((botName) =>
      botName.toLowerCase().includes(content.toLowerCase())
    );
    setBotsToShowT1(newBotsList);
  };

  const handleInputChangeT2 = (target) => {
    const content = target.value;
    const newBotsList = botsList.filter((botName) =>
      botName.toLowerCase().includes(content.toLowerCase())
    );
    setBotsToShowT2(newBotsList);
  };

  useEffect(() => {
    setBotsToShowT1(botsList);
    setBotsToShowT2(botsList);
  }, [botsList]);

  const handleSimulationRequest = async () => {
    setIsSimulating(true);
    const response = await startSimulation(bot1, bot2, times);
    setSimulationResult(response.data);
    setIsSimulating(false);
  };

  const resetSettings = () => {
    setSimulationResult();
    setBot1("MineiroByBueno");
    setBot2("DummyBot");
    setTimes(1);
    setBotsToShowT1(botsList);
    setBotsToShowT2(botsList);
  };

  return (
    <main className="config-simulation h-300">
      <section>
        <ChakraProvider>
          {simulationResult && !isSimulating && (
            <div id="simulation-results">
              <p className="times">Partidas: {simulationResult.gamesPlayed}</p>
              <p className="time-to-execute">
                Tempo de execução: {simulationResult.timeToExecute}ms
              </p>
              <div className="scoreboard">
                <p className="bot1-name">{simulationResult.bot1Name}</p>
                {/*.winner e .loser estão estilizados no arquivo Tournament.css*/}
                <p
                  className={
                    (bot1Wins > bot2Wins ? "winner " : "loser ") + "bot1-wins"
                  }
                >
                  {bot1Wins}
                </p>
                <p className="versus">X</p>
                <p
                  className={
                    (bot2Wins > bot1Wins ? "winner " : "loser ") + "bot2-wins"
                  }
                >
                  {bot2Wins}
                </p>
                <p className="bot2-name">{simulationResult.bot2Name}</p>
              </div>
              <button
                type="button"
                className="btn btn-dark"
                onClick={(e) => {
                  e.preventDefault();
                  resetSettings();
                }}
              >
                Simular Novamente
              </button>
            </div>
          )}
          {!simulationResult && isSimulating && (
            <>
              <p>Simulando</p>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="black"
                size="xl"
                className="spinner"
              />
              <p style={{ margin: "0px" }}>Isso pode demorar um pouco...</p>
              <button
                className="btn btn-danger"
                onClick={(e) => {
                  e.preventDefault();
                  setIsSimulating(false);
                }}
              >
                Cancelar
              </button>
            </>
          )}
          {!simulationResult && !isSimulating && (
            <>
              <p className="fs-5 mb-0 text-center">Simular Confronto</p>
              <form className="mb-3 mt-4">
                <Input
                  className="bot-filter in1"
                  onChange={(e) => handleInputChangeT1(e.target)}
                  placeholder="Busque pelo nome"
                ></Input>
                <div className="p1-name">
                  <p>{bot1}</p>
                </div>
                <div
                  style={{
                    alignContent: "center",
                  }}
                >
                  <p style={{ marginBottom: "0px" }} id="vs-label">
                    VS
                  </p>
                </div>
                <div className="p2-name">
                  <p>{bot2}</p>
                </div>

                <Input
                  className="bot-filter in2"
                  onChange={(e) => handleInputChangeT2(e.target)}
                  placeholder="Busque pelo nome"
                ></Input>

                <div className="others">
                  <label
                    style={{ alignSelf: "center" }}
                    htmlFor="number-of-simulations"
                  >
                    Número de simulações
                  </label>
                  <Input
                    id="number-of-simulations"
                    type="number"
                    onChange={(e) => {
                      if (e.target.value > 10000) {
                        e.target.value = 10000;
                      }
                      setTimes(e.target.value);
                    }}
                  ></Input>
                </div>
                <div className="middle-container">
                  {/* <img src={IMAGES[`card_back`]} alt={"back"} /> */}
                  <i className="bi bi-suit-spade-fill" />
                  <button
                    type="submit"
                    className="btn btn-dark play-btn"
                    w={"100px"}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSimulationRequest();
                    }}
                  >
                    JOGAR
                  </button>
                </div>

                <div className="table1">
                  <BotsTable
                    selectedBot={bot1}
                    setSelectedBot={setBot1}
                    bots={botsToShowT1}
                  />
                </div>
                <div className="table2">
                  <BotsTable
                    selectedBot={bot2}
                    setSelectedBot={setBot2}
                    bots={botsToShowT2}
                  />
                </div>
              </form>
            </>
          )}
        </ChakraProvider>
      </section>
    </main>
  );
};

export default ConfigSimulation;
