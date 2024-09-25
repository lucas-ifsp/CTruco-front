import React, { useEffect, useState } from "react";
import { ChakraProvider, List, ListItem, Checkbox } from "@chakra-ui/react";
import "./TournamentConfig.css";
import useGetBotNames from "../../hooks/api/useGetBotNames";

const TournamentConfig = () => {
  const [l1Bots, setL1Bots] = useState([]);
  const [l2Bots, setL2Bots] = useState([]);
  const [selectedBotsToInsert, setSelectedBotsToInsert] = useState([]);
  const [selectedBotsToRemove, setSelectedBotsToRemove] = useState([]);
  const [selectAllL1, setSelectAllL1] = useState(false); // Estado para "Selecionar Todos" de l1Bots
  const [selectAllL2, setSelectAllL2] = useState(false); // Estado para "Selecionar Todos" de l2Bots
  const fetchBotNames = useGetBotNames();

  const updateBotsList = async () => {
    const response = await fetchBotNames();
    const data = await response.data.sort();
    setL1Bots(data);
  };

  useEffect(() => {
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
    if (selectAllL1) {
      // Desmarcar todos
      setSelectedBotsToInsert([]);
    } else {
      // Selecionar todos
      setSelectedBotsToInsert([...l1Bots]);
    }
    setSelectAllL1(!selectAllL1);
  };

  const toggleSelectAllL2 = () => {
    if (selectAllL2) {
      // Desmarcar todos
      setSelectedBotsToRemove([]);
    } else {
      // Selecionar todos
      setSelectedBotsToRemove([...l2Bots]);
    }
    setSelectAllL2(!selectAllL2);
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
    if (selectAllL1) {
      setSelectAllL1(!selectAllL1);
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
    if (selectAllL2) {
      setSelectAllL2(!selectAllL2);
    }
  };

  return (
    <main className="tournament-config">
      <section>
        <form>
          {/* Lista de l1Bots com o "Selecionar Todos" */}
          <div className="list-limiter">
            <ChakraProvider>
              <Checkbox
                onChange={toggleSelectAllL1}
                isChecked={selectAllL1}
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

          {/* Lista de l2Bots com o "Selecionar Todos" */}
          <div className="list-limiter">
            <ChakraProvider>
              <Checkbox
                onChange={toggleSelectAllL2}
                isChecked={selectAllL2}
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
        </form>
      </section>
    </main>
  );
};

export default TournamentConfig;
