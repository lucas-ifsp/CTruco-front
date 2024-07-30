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
      <main id="crud-remote">
        <section>
          <ChakraProvider>
            <label id="bots-filter-label" htmlFor="bots-filter">
              BUSCAR PELO NOME
            </label>
            <div className="crud-remote-header">
              <Input type="text" id="bots-filter" />
              <Button height={"50px"} backgroundColor={"lightgreen"} className="add-btn">
                Adicionar
              </Button>
            </div>
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
                      <Button className="edit-btn" backgroundColor={"yellow"}>
                        Editar
                      </Button>
                      <Button className="remove-btn" backgroundColor={"red"}>
                        Remover
                      </Button>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>RemoteBot2</Td>
                    <Td>http://localhost</Td>
                    <Td>8081</Td>
                    <Td>
                      <Button className="edit-btn" backgroundColor={"yellow"}>
                        Editar
                      </Button>
                      <Button className="remove-btn" backgroundColor={"red"}>
                        Remover
                      </Button>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </ChakraProvider>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AddRemote;
