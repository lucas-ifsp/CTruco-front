import React from "react";
import Header from "../../../components/templates/Header";
import Menu from "../../../components/templates/Menu";
import Footer from "../../../components/templates/Footer";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Input,
  ChakraProvider,
} from "@chakra-ui/react";
import "./AddRemote.css";
import "../Home.css";

const AddRemote = () => {
  return (
    <div className="app">
      <Header />
      <Menu />
      <form>
        <ChakraProvider>
          <label htmlFor="bots_filter"> BUSCAR PELO NOME </label>
          <br/>
          <Input type="text" id="bots_filter" />
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
                <Tr>
                  <Td>RemoteBot</Td>
                  <Td>http://localhost</Td>
                  <Td>8080</Td>
                  <Td>
                    <Button color={"yellow"}>Editar</Button>
                    <Button color={"red"}>Remover</Button>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </ChakraProvider>
      </form>
      <Footer />
    </div>
  );
};

export default AddRemote;
