import { React, useEffect, useState, useRef } from "react";
import { Button, useDisclosure } from "@chakra-ui/react";
import EditButtonModal from "./EditButtonModal";

const EditButton = ({ updateUserBots }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const buttonRef = useRef();
  const [botName, setBotName] = useState();
  const [botUrl, setBotUrl] = useState();
  const [botPort, setBotPort] = useState();

  useEffect(() => {
    const botTuple = buttonRef.current.parentElement.parentElement;
    setBotName(botTuple.children[0].innerText);
    setBotUrl(botTuple.children[1].innerText);
    setBotPort(botTuple.children[2].innerText);
  }, [isOpen]);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={onOpen}
        className="btn btn-warning edit-btn"
      >
        Editar
      </button>

      <EditButtonModal
        isOpen={isOpen}
        onClose={onClose}
        updateUserBots={updateUserBots}
        prevName={botName}
        prevUrl={botUrl}
        prevPort={botPort}
      />
    </>
  );
};

export default EditButton;
