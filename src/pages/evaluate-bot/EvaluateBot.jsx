import { React, useState, useEffect, useRef } from "react";
import BotsTable from "../home/mat/BotsTable";
import { ChakraProvider, Input, Spinner } from "@chakra-ui/react";
import useGetBotNames from "../../hooks/api/useGetBotNames";
import "./EvaluateBot.css";
import useEvaluateStatus from "../context/useEvaluateStatus";
import useEvaluateBot from "./useEvaluateBot";

const EvaluateBot = () => {
  const [botsList, setBotsList] = useState([]);
  const [botsToShow, setBotsToShow] = useState(botsList);
  const [selectedBot, setSelectedBot] = useState("DummyBot");
  const [evaluateResult, setEvaluateResult] = useState({});
  const {
    isEvaluating,
    setIsEvaluating,
    evaluateResultString,
    setEvaluateResultString,
  } = useEvaluateStatus();
  const fetchBotNames = useGetBotNames();
  const evaluateService = useEvaluateBot();
  const containerRef = useRef();

  const inputChangeHandler = (target) => {
    const content = target.value;
    const newBotsList = botsList.filter((botName) =>
      botName.toLowerCase().includes(content.toLowerCase())
    );
    setBotsToShow(newBotsList);
  };

  const updateBotsList = async () => {
    const response = await fetchBotNames();
    const data = await response.data.sort();
    setBotsList(data);
  };

  const updateEvaluateResults = async (botName) => {
    // public record EvaluateResultsDto(long computingTime,
    //                                  long numberOfGames,
    //                                  long evaluatedBotWins,
    //                                  double winRate,
    //                                  double percentile,
    //                                  long matchWins
    //                                  )
    //{}
    setIsEvaluating(true);
    const response = await evaluateService(botName);
    setIsEvaluating(false);
    setEvaluateResultString(response);
  };

  const submitHandler = () => {
    updateEvaluateResults(selectedBot);
  };

  useEffect(() => {
    setBotsToShow(botsList);
  }, [botsList]);

  useEffect(() => {
    setEvaluateResult(JSON.parse(JSON.stringify(evaluateResultString)));
  }, [evaluateResultString]);

  useEffect(() => {
    updateBotsList();
    setEvaluateResult(JSON.parse(JSON.stringify(evaluateResultString)));
  }, []);

  return (
    <main id="evaluate-bot" className="cs-feat">
      <section>
        <div className="section-header">
          <p className="fs-5 mb-0 text-center">Avaliar Bot</p>
        </div>
        <div className="mb-3 mt-4 section-content">
          <div className="selected-bot-container">
            <p className="mb-0 text-start">BotSelecionado:</p>
            <p className="mb-0 text-start">{selectedBot}</p>
          </div>
          {isEvaluating && !evaluateResultString && (
            <ChakraProvider>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="black"
                size="xl"
                className="spinner"
              />
              <p style={{ margin: "0px" }}>Isso pode demorar um pouco...</p>
            </ChakraProvider>
          )}
          {!isEvaluating && !evaluateResultString && (
            <>
              <ChakraProvider>
                <Input
                  className="filter"
                  ref={containerRef}
                  type="text"
                  onChange={(e) => inputChangeHandler(e.target)}
                  placeholder="Procure pelo Nome"
                ></Input>
                <div className="evaluate-table-limiter">
                  <BotsTable
                    selectedBot={selectedBot}
                    setSelectedBot={setSelectedBot}
                    bots={botsToShow}
                  />
                </div>
              </ChakraProvider>
              <button
                className="btn btn-dark"
                onClick={() => {
                  submitHandler();
                }}
              >
                Avaliar
              </button>
            </>
          )}
          {evaluateResult && (
            <div id="evaluate-result">
              <div className="computing-time">
                <p>Tempo de Análise:</p>
                <p>
                  {evaluateResult.computingTime
                    ? (evaluateResult.computingTime / 1000).toFixed(2)
                    : 0}
                  s
                </p>
              </div>
              <div className="defeated-opponents">
                <p>Adversários Vencidos:</p>
                <p>
                  {evaluateResult.defeatedOpponents} /{" "}
                  {evaluateResult.numberOfOpponents}
                </p>
              </div>
              <div className="victories">
                <p>Vitórias Totais:</p>
                <p>
                  {evaluateResult.evaluatedBotWins} /
                  {evaluateResult.numberOfGames}
                </p>
              </div>
              <div className="win-rate">
                <p>Taxa de vitória:</p>
                <p>
                  {evaluateResult.winRate
                    ? evaluateResult.winRate.toFixed(2)
                    : "0"}
                  %
                </p>
              </div>
              <div className="percentile">
                <p>Percentil:</p>
                <p>
                  {evaluateResult.percentile
                    ? evaluateResult.percentile.toFixed(2)
                    : "0"}
                  %
                </p>
              </div>
              <button
                className="btn btn-dark"
                onClick={() => {
                  setEvaluateResultString("");
                  setIsEvaluating(false);
                }}
              >
                Avaliar outro bot
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default EvaluateBot;
