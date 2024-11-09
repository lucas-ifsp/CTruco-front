import React from "react";
import { useDisclosure } from "@chakra-ui/react";
import DeleteButtonModal from "./DeleteButtonModal";

const DeleteButton = ({ botName, updateUserBots }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <button onClick={onOpen} className="btn btn-dark remove-btn">
        <i className="bi bi-trash-fill" />
      </button>

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
