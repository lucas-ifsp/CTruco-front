import React from "react";
import { Button, useDisclosure } from "@chakra-ui/react";
import DeleteButtonModal from "./DeleteButtonModal";

const DeleteButton = ({
  userBots,
  setUserBots,
  visibleOnes,
  setVisibleOnes,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  //TODO - fazer isso
  const handleDeleteAction = () => {};

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
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        handleDeleteAction={handleDeleteAction}
      />
    </>
  );
};

export default DeleteButton;
