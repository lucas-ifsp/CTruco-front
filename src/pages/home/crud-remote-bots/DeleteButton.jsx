import React from "react";
import { Button, useDisclosure } from "@chakra-ui/react";
import DeleteButtonModal from "./DeleteButtonModal";

const DeleteButton = () => {
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

      <DeleteButtonModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
};

export default DeleteButton;
