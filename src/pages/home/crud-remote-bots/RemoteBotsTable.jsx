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
import DeleteButton from "./delete/DeleteButton";
import EditButton from "./edit/EditButton";

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
              <Td className="table-info">{bot.botName}</Td>
              <Td className="table-info">{bot.url}</Td>
              <Td className="table-info">{bot.port}</Td>
              <Td className="table-info">
                <EditButton />
                <DeleteButton
                  userBots={userBots}
                  setUserBots={setUserBots}
                  visibleOnes={visibleOnes}
                  setVisibleOnes={setVisibleOnes}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default RemoteBotsTable;
