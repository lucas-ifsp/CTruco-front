import { React, useEffect, useState, useRef } from "react";
import { useDisclosure } from "@chakra-ui/react";
import useGetRemoteBotByName from "../../../hooks/api/useGetRemoteBotByName";
import EditButtonModal from "./EditButtonModal";

const EditButton = ({ updateUserBots }) => {
  const getOne = useGetRemoteBotByName();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const buttonRef = useRef();
  const [botName, setBotName] = useState();
  const [botUrl, setBotUrl] = useState();
  const [botPort, setBotPort] = useState();
  const [botRepositoryUrl, setBotRepositoryUrl] = useState();

  useEffect(() => {
    const botTuple = buttonRef.current.parentElement.parentElement;
    setBotName(botTuple.children[0].innerText);
    const bot = getBotStatus();
  }, [isOpen]);

  const getBotStatus = async () => {
    // String botName, String userName, String url, String port,String repositoryUrl
    if (!botName) return;
    const bot = await getOne(botName);
    setBotPort(bot.port);
    setBotUrl(bot.url);
    setBotRepositoryUrl(bot.repositoryUrl);
  };
  return (
    <>
      <button
        ref={buttonRef}
        onClick={onOpen}
        className="btn btn-dark edit-btn"
      >
        <i className="bi bi-pencil-square" />
      </button>

      <EditButtonModal
        isOpen={isOpen}
        onClose={onClose}
        updateUserBots={updateUserBots}
        prevName={botName}
        prevUrl={botUrl}
        prevPort={botPort}
        prevRepositoryUrl={botRepositoryUrl}
      />
    </>
  );
};

export default EditButton;
