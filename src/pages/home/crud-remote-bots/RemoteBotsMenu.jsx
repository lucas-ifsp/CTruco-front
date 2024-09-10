import { React, useEffect, useState } from "react";
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
            <button
              height={"50px"}
              className="btn btn-dark add-btn"
              onClick={onOpen}
            >
              <i className="bi bi-plus-circle-fill" />
            </button>
            <AddRemoteFormModal
              isOpen={isOpen}
              onClose={onClose}
              updateUserBots={updateUserBots}
            />
          </div>
          <RemoteBotsTable
            visibleOnes={visibleBots}
            updateUserBots={updateUserBots}
          />
        </ChakraProvider>
      </section>
    </main>
  );
};

export default RemoteBotsMenu;
