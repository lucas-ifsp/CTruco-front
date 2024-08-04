import React from "react";
import { Button, useDisclosure } from "@chakra-ui/react";
import useDeleteRemoteOne from "./useDeleteRemoteOne";
import DeleteButtonModal from "./DeleteButtonModal";

const DeleteButton = ({
  botName,
  updateUserBots,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const deleteBotHook = useDeleteRemoteOne();

  const handleDeleteAction = async (botName) => {
    await deleteBotHook(botName);
    updateUserBots();
  };

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
        handleDeleteAction={handleDeleteAction}
      />
    </>
  );
};

export default DeleteButton;
