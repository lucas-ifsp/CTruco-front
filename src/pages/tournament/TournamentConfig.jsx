import React, { useEffect, useState } from "react";
import { ChakraProvider, List, ListItem, Checkbox } from "@chakra-ui/react";
import "./TournamentConfig.css";
import useGetBotNames from "../../hooks/api/useGetBotNames";
import useTournamentStatus from "../context/useTournamentStatus";
import useCreateTournament from "./useCreateTournament";
import { useNavigate } from "react-router-dom";

const TournamentConfig = () => {
  const [l1Bots, setL1Bots] = useState([]);
  const [l2Bots, setL2Bots] = useState([]);
  const [selectedBotsToInsert, setSelectedBotsToInsert] = useState([]);
  const [selectedBotsToRemove, setSelectedBotsToRemove] = useState([]);
  const [isAllSelectedL1, setIsAllSelectedL1] = useState(false);
  const [isAllSelectedL2, setIsAllSelectedL2] = useState(false);
  const { championship, setChampionship } = useTournamentStatus();
  const fetchBotNames = useGetBotNames();
  const createTournament = useCreateTournament();
  const navigate = useNavigate();

  const updateBotsList = async () => {
    const response = await fetchBotNames();
    const data = await response.data.sort();
    setL1Bots(data);
  };

  useEffect(() => {
    if (championship) {
      navigate("/tournament");
    }
    updateBotsList();
  }, []);

  const handleCheckboxChangeL1 = (bot) => {
    let bots = [...selectedBotsToInsert];

    if (bots.includes(bot)) {
      let index = bots.findIndex((b) => b === bot);

      if (index > -1) {
        bots.splice(index, 1);
        console.log("REMOVEU!!");
      }
    } else {
      bots.push(bot);
      console.log("ADICIONOU!!");
    }

    setSelectedBotsToInsert(bots);
  };

  const handleCheckboxChangeL2 = (bot) => {
    let bots = [...selectedBotsToRemove];

    if (bots.includes(bot)) {
      let index = bots.findIndex((b) => b === bot);

      if (index > -1) {
        bots.splice(index, 1);
        console.log("REMOVEU!!");
      }
    } else {
      bots.push(bot);
      console.log("ADICIONOU!!");
    }

    setSelectedBotsToRemove(bots);
  };

  const toggleSelectAllL1 = () => {
    if (isAllSelectedL1) {
      setSelectedBotsToInsert([]);
    } else {
      setSelectedBotsToInsert([...l1Bots]);
    }
    setIsAllSelectedL1(!isAllSelectedL1);
  };

  const toggleSelectAllL2 = () => {
    if (isAllSelectedL2) {
      setSelectedBotsToRemove([]);
    } else {
      setSelectedBotsToRemove([...l2Bots]);
    }
    setIsAllSelectedL2(!isAllSelectedL2);
  };

  const handleInsert = () => {
    let botsList1 = [...l1Bots];
    let botsList2 = [...l2Bots];
    selectedBotsToInsert.forEach((bot) => botsList2.push(bot));
    selectedBotsToInsert.forEach((bot) => {
      let index = botsList1.findIndex((b) => b === bot);
      if (index > -1) {
        botsList1.splice(index, 1);
      }
    });
    setSelectedBotsToInsert([]);
    setL1Bots(botsList1.sort());
    setL2Bots(botsList2.sort());
    if (isAllSelectedL1) {
      setIsAllSelectedL1(!isAllSelectedL1);
    }
  };

  const handleRemove = () => {
    let botsList1 = [...l1Bots];
    let botsList2 = [...l2Bots];
    selectedBotsToRemove.forEach((bot) => botsList1.push(bot));
    selectedBotsToRemove.forEach((bot) => {
      let index = botsList2.findIndex((b) => b === bot);
      if (index > -1) {
        botsList2.splice(index, 1);
      }
    });
    setSelectedBotsToRemove([]);
    setL1Bots(botsList1.sort());
    setL2Bots(botsList2.sort());
    if (isAllSelectedL2) {
      setIsAllSelectedL2(!isAllSelectedL2);
    }
  };

  const createCamp = async (bots) => {
    let camp = await createTournament(bots);
    console.log(camp);
    console.log(camp.matchesDTO);
    setChampionship(camp);
    navigate("/tournament");
  };

  return (
    <main className="tournament-config">
      <section>
        <form>
          <div className="list-limiter">
            <ChakraProvider>
              <Checkbox
                onChange={toggleSelectAllL1}
                isChecked={isAllSelectedL1}
                mb={2}
              >
                Selecionar Todos
              </Checkbox>
              <List paddingLeft={"0px"} paddingRight={"15px"} spacing={3}>
                {l1Bots.map((bot) => (
                  <ListItem key={bot}>
                    <Checkbox
                      onChange={() => handleCheckboxChangeL1(bot)}
                      isChecked={selectedBotsToInsert.includes(bot)}
                    >
                      {bot}
                    </Checkbox>
                  </ListItem>
                ))}
              </List>
            </ChakraProvider>
          </div>

          <div className="actions-container">
            <button
              className="btn btn-dark play-btn"
              onClick={(e) => {
                e.preventDefault();
                handleInsert();
              }}
            >
              <i className="bi bi-arrow-right"></i>
            </button>
            <button
              className="btn btn-dark play-btn"
              onClick={(e) => {
                e.preventDefault();
                handleRemove();
              }}
            >
              <i className="bi bi-arrow-left"></i>
            </button>
          </div>

          <div className="list-limiter">
            <ChakraProvider>
              <Checkbox
                onChange={toggleSelectAllL2}
                isChecked={isAllSelectedL2}
                mb={2}
              >
                Selecionar Todos
              </Checkbox>
              <List paddingLeft={"0px"} paddingRight={"15px"} spacing={3}>
                {l2Bots.map((bot) => (
                  <ListItem key={bot}>
                    <Checkbox
                      onChange={() => handleCheckboxChangeL2(bot)}
                      isChecked={selectedBotsToRemove.includes(bot)}
                    >
                      {bot}
                    </Checkbox>
                  </ListItem>
                ))}
              </List>
            </ChakraProvider>
          </div>
          <button
            type="submit"
            className="btn btn-dark play-btn"
            onClick={(e) => {
              e.preventDefault();
              if (l2Bots.length == 8) {
                createCamp(l2Bots);
              } else {
                console.log("Numero invalido de jogadores: " + l2Bots.length);
              }
            }}
          >
            Começar Torneio
          </button>
        </form>
      </section>
    </main>
  );
};

export default TournamentConfig;
