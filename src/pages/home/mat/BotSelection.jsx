import { Input } from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import "./BotSelection.css";
import BotsTable from "./BotsTable";

const BotTableSelection = ({ setSelectedBot, selectedBot, botsList }) => {
  const [botsToShow, setBotsToShow] = useState(botsList);
  const containerRef = useRef();

  const handleInputChange = (target) => {
    const content = target.value;
    const newBotsList = botsList.filter((botName) =>
      botName.toLowerCase().includes(content.toLowerCase())
    );
    setBotsToShow(newBotsList);
  };

  useEffect(() => {
    setBotsToShow(botsList);
  }, [botsList]);

  return (
    <>
      <Input
        className="filter"
        ref={containerRef}
        type="text"
        onChange={(e) => handleInputChange(e.target)}
        placeholder="Procure pelo Nome"
      ></Input>
      <BotsTable
        setSelectedBot={setSelectedBot}
        selectedBot={selectedBot}
        bots={botsToShow}
      ></BotsTable>
    </>
  );
};

export default BotTableSelection;
