import React, { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useCreateGame from "../../../hooks/api/useCreateGame";
import useIntel from "../../../hooks/context/useIntel";
import { ChakraProvider } from "@chakra-ui/react";
import useGetBotNames from "../../../hooks/api/useGetBotNames";
import BotSelection from "./BotSelection";
import "./StartGameMat.css";
import Header from "../../../components/templates/Header";
import Menu from "../../../components/templates/Menu";
import Footer from "../../../components/templates/Footer";

const StartGameMat = () => {
  const { intel } = useIntel();
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
    navigate("/mat/game");
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
    <div className="app">
      <Header />
      <Menu />
      {console.log(intel)}
      {intel && intel.last  ? (
        <Navigate to="/mat/game" />
      ) : (
        <main className="choose-opponent h-300">
          <form>
            <p className="fs-5 mb-3 text-center">Nova partida</p>
            <div className="mb-3 mt-4">
              <label htmlFor="inputOpponent" className="form-label">
                ESCOLHA O OPONENTE
              </label>
              <ChakraProvider>
                <BotSelection
                  setSelectedBot={setOpponentName}
                  selectedBot={opponentName}
                  botsList={botsList}
                  setBotsList={setBotsList}
                ></BotSelection>
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
      )}
      <Footer />
    </div>
  );
};

export default StartGameMat;
