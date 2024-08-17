import React from "react";
import { Button, useDisclosure } from "@chakra-ui/react";
import DeleteButtonModal from "./DeleteButtonModal";

const DeleteButton = ({ botName, updateUserBots }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        className="remove-btn"
        backgroundColor={"#ff3f3f"}
      >
        Remover
      </Button>

      <DeleteButtonModal
        botName={botName}
        isOpen={isOpen}
        onClose={onClose}
        updateUserBots={updateUserBots}
      />
    </>
  );
};

export default DeleteButton;
