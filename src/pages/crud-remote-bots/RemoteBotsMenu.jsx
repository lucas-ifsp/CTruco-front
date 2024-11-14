import { React, useEffect, useState } from "react";
import RemoteBotsTable from "./RemoteBotsTable";
import RemoteBotsAlert from "./RemoteBotsAlert";
import { Input, ChakraProvider, useDisclosure } from "@chakra-ui/react";
import useGetRemoteBotsByUserId from "../../hooks/api/useGetRemoteBotsByUser";
import useAuth from "../../hooks/context/useAuth";
import "./RemoteBotsMenu.css";
import AddRemoteFormModal from "./add/AddRemoteFormModal";

const RemoteBotsMenu = () => {
  const [userBots, setUserBots] = useState([]);
  const [visibleBots, setVisibleBots] = useState([]);
  const [alertText, setAlertText] = useState(
    "Remova um bot clicando no icone da lixeira"
  );
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
      <ChakraProvider>
        <section>
          <p className="fs-5 mb-0 text-center">Remote Bots Menu</p>
          <div className="mb-3 mt-4 section-content">
            <label id="bots-filter-label" htmlFor="bots-filter">
              Busque pelo nome
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
          </div>
        </section>
        <RemoteBotsAlert
          bootsTrapColor={"info"}
          text={alertText}
          setText={setAlertText}
        />
      </ChakraProvider>
    </main>
  );
};

export default RemoteBotsMenu;
