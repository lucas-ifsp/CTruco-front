import React, { useEffect, useState } from "react";
import Header from "../../../components/templates/Header";
import Menu from "../../../components/templates/Menu";
import Footer from "../../../components/templates/Footer";
import RemoteBotsTable from "./RemoteBotsTable";
import { Button, Input, ChakraProvider, useDisclosure } from "@chakra-ui/react";
import useGetRemoteBotsByUserId from "../../../hooks/api/useGetRemoteBotsByUser";
import useAuth from "../../../hooks/context/useAuth";
import "./RemoteBotsMenu.css";
import "../Home.css";
import AddRemoteFormModal from "./add/AddRemoteFormModal";

const RemoteBotsMenu = () => {
  const [userBots, setUserBots] = useState([]);
  const [visibleBots, setVisibleBots] = useState([]);
  const { auth } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fetchBots = useGetRemoteBotsByUserId();

  const updateUserBots = async () => {
    const bots = (await fetchBots(auth.uuid)).data;
    setUserBots(bots);
    setVisibleBots(bots);
  };

  useEffect(() => {
    updateUserBots();
  }, []);

  const handleInputChange = (target) => {
    const content = target.value;
    const newBotsList = userBots.filter((bot) => {
      const botToString = bot.botName + bot.url + bot.port;
      return botToString.toLowerCase().includes(content.toLowerCase());
    });
    setVisibleBots(newBotsList);
  };

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
              <Input
                type="text"
                id="bots-filter"
                onChange={(e) => handleInputChange(e.target)}
              />
              <Button
                height={"50px"}
                backgroundColor={"#57f057"}
                className="add-btn"
                onClick={onOpen}
              >
                Adicionar
              </Button>
              <AddRemoteFormModal isOpen={isOpen} onClose={onClose} />
            </div>
            <RemoteBotsTable
              userBots={userBots}
              setUserBots={setUserBots}
              visibleOnes={visibleBots}
              setVisibleOnes={setVisibleBots}
            />
          </ChakraProvider>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default RemoteBotsMenu;
