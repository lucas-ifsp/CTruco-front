import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import useDeleteRemote from "./useDeleteRemote";

const DeleteButtonModal = ({ isOpen, onClose, botName, updateUserBots }) => {
  const deleteBotHook = useDeleteRemote();
  const handleDeleteAction = async (botName) => {
    await deleteBotHook(botName);
    updateUserBots();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Tem Certeza?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p
            style={{
              fontSize: "24px",
              color: "red",
            }}
          >
            Se confirmar esta ação o bot será removido!!
          </p>
          <p>isto não pode ser desfeito.</p>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="green"
            mr={3}
            onClick={() => {
              onClose();
              handleDeleteAction(botName);
            }}
          >
            Confirmar
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteButtonModal;
