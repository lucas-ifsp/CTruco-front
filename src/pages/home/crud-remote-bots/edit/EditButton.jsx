import React from "react";
import { Button, useDisclosure } from "@chakra-ui/react";
import EditButtonModal from "./EditButtonModal";

const EditButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} className="edit-btn" backgroundColor={"yellow"}>
        Editar
      </Button>

      <EditButtonModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default EditButton;
