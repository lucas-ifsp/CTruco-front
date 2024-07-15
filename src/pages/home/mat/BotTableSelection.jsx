import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import "./BotTableSelection.css";

const BotTableSelection = ({ setOpponentName, opponentName, botsList }) => {
  const [listNames, setListNames] = useState(botsList);
  const containerRef = useRef();
  const handleClick = (event) => {
    event.preventDefault();
    setOpponentName(event.target.innerText);
  };

  const handleInputChange = (target) => {
    const content = target.value;
    const newBotsList = botsList.filter((botName) =>
      botName.toLowerCase().includes(content.toLowerCase())
    );
    setListNames(newBotsList);
  };

  useEffect(() => {
    containerRef.current.value = opponentName;
    handleInputChange(containerRef.current);
  }, [opponentName]);

  useEffect(() => {
    setListNames(botsList);
  }, [botsList]);

  return (
    <>
      <input
        ref={containerRef}
        type="text"
        onChange={(e) => handleInputChange(e.target)}
        placeholder="Procure pelo Nome"
      ></input>
      <TableContainer className="bots-table">
        <Table variant="striped" colorScheme="gray">
          <TableCaption>Bots</TableCaption>
          <Thead>
            <Tr>
              <Th>Bots</Th>
            </Tr>
          </Thead>
          <Tbody>
            {listNames.map((name) => (
              <Tr key={name}>
                <Td>
                  <a href="/" onClick={(e) => handleClick(e)}>
                    {name}
                  </a>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default BotTableSelection;
