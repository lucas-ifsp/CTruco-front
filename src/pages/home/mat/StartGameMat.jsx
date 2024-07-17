import React, { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useCreateGame from "../../../hooks/api/useCreateGame";
import { ChakraProvider } from "@chakra-ui/react";
import useGetBotNames from "../../../hooks/api/useGetBotNames";
import BotTableSelection from "./BotTableSelection";
import "./StartGameMat.css";

const StartGameMat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const [botsList, setBotsList] = useState(["MineiroByBueno", "DummyBot"]);
  const [opponentName, setOpponentName] = useState("MineiroByBueno");
  const createWithBot = useCreateGame();
  const fetchBotNames = useGetBotNames();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createWithBot(opponentName);
    <Navigate to="mat/game"/>;
  };

  const updateBotsList = async () => {
    const response = await fetchBotNames();
    const data = await response.data.sort();
    setBotsList(data);
  };

  useEffect(() => {
    updateBotsList();
  }, []);

  return (
    <main className="choose-opponent h-300">
      <form>
        <p className="fs-5 mb-3 text-center">Nova partida</p>
        <div className="mb-3 mt-4">
          <label htmlFor="inputOpponent" className="form-label">
            ESCOLHA O OPONENTE
          </label>
          <ChakraProvider>
            <BotTableSelection
              setOpponentName={setOpponentName}
              opponentName={opponentName}
              botsList={botsList}
              setBotsList={setBotsList}
            ></BotTableSelection>
          </ChakraProvider>
        </div>
        <button
          type="submit"
          className="btn w-100 btn-dark mt-3 mb-3"
          onClick={handleSubmit}
        >
          jogar X {opponentName}
        </button>
      </form>
    </main>
  );
};

export default StartGameMat;
