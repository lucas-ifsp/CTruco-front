import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BotsTable from "./BotsTable";
import useCreateGame from "../../hooks/api/useCreateGame";
import useIntel from "../../hooks/context/useIntel";
import { ChakraProvider, Input } from "@chakra-ui/react";
import useGetBotNames from "../../hooks/api/useGetBotNames";
import "./StartGameMat.css";

const StartGameMat = () => {
  const { intel } = useIntel();
  const navigate = useNavigate();
  const containerRef = useRef();

  const [botsList, setBotsList] = useState(["MineiroByBueno", "DummyBot"]);
  const [botsToShow, setBotsToShow] = useState(botsList);
  const [opponentName, setOpponentName] = useState("MineiroByBueno");
  const createWithBot = useCreateGame();
  const fetchBotNames = useGetBotNames();

  const handleInputChange = (target) => {
    const content = target.value;
    const newBotsList = botsList.filter((botName) =>
      botName.toLowerCase().includes(content.toLowerCase())
    );
    setBotsToShow(newBotsList);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createWithBot(opponentName);
    navigate("/mat/game");
  };

  const updateBotsList = async () => {
    const response = await fetchBotNames();
    const data = await response.data.sort();
    setBotsList(data);
  };

  useEffect(() => {
    setBotsToShow(botsList);
  }, [botsList]);

  useEffect(() => {
    if (intel && intel.last) {
      navigate("/mat/game");
    }
    updateBotsList();
  }, []);

  return (
    <>
      <main className="choose-opponent cs-feat">
        <form>
          <p className="fs-5 mb-0 text-center">Nova partida</p>
          <div className="mb-3 mt-4">
            <label htmlFor="inputOpponent" className="form-label">
              Escolha o oponente
            </label>
            <ChakraProvider>
              <Input
                className="filter"
                ref={containerRef}
                type="text"
                onChange={(e) => handleInputChange(e.target)}
                placeholder="Busque pelo nome"
              ></Input>
              <div className="start-game-mat-table">
                <BotsTable
                  selectedBot={opponentName}
                  setSelectedBot={setOpponentName}
                  bots={botsToShow}
                />
              </div>
            </ChakraProvider>
          </div>
          <button
            type="submit"
            className="btn w-100 btn-dark"
            onClick={handleSubmit}
          >
            Jogar X {opponentName}
          </button>
        </form>
      </main>
    </>
  );
};

export default StartGameMat;
