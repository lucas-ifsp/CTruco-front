import { Container, ListItem, UnorderedList } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "./BotSelection.css";

const BotSelection = ({
  setOpponentName,
  opponentName,
  botsList,
  setBotsList,
}) => {
  const [listNames, setListNames] = useState(botsList);
  const handleClick = (event) => {
    event.preventDefault();
    setOpponentName(event.target.innerText);
  };

  const handleInputChange = (e) => {
    const content = e.target.value;
    const newBotsList = botsList.filter((botName) =>
      botName.toLowerCase().includes(content.toLowerCase())
    );
    setListNames(newBotsList);
  };

  useEffect(() => {
    setListNames(botsList);
  }, [botsList]);

  return (
    <>
      <input
        type="text"
        onChange={(e) => handleInputChange(e)}
        placeholder="Procure pelo Nome"
      ></input>
      <UnorderedList className="unordered-list">
        {listNames.map((name) => (
          <ListItem key={name} className="list-item">
            <a href="/" onClick={(e) => handleClick(e)}>
              {name}
            </a>
          </ListItem>
        ))}
      </UnorderedList>
    </>
  );
};

export default BotSelection;
