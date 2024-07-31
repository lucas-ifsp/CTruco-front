import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import DeleteButton from "./DeleteButton";

const RemoteBotsTable = ({
  userBots,
  setUserBots,
  visibleOnes,
  setVisibleOnes,
}) => {
  return (
    <TableContainer className="bots-table">
      <Table variant="simple" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Bot</Th>
            <Th>Endereço</Th>
            <Th>Porta</Th>
            <Th>Opções</Th>
          </Tr>
        </Thead>
        <Tbody>
          {visibleOnes.map((bot) => (
            <Tr key={bot.botName}>
              <Td>{bot.botName}</Td>
              <Td>{bot.url}</Td>
              <Td>{bot.port}</Td>
              <Td>
                <Button className="edit-btn" backgroundColor={"yellow"}>
                  Editar
                </Button>
                <DeleteButton/>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default RemoteBotsTable;
