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
import useAlertStatus from "../../context/useAlertStatus";

const DeleteButtonModal = ({ isOpen, onClose, botName, updateUserBots }) => {
  const deleteBotHook = useDeleteRemote();

  const { setAlertColor, setAlertText } = useAlertStatus();

  const handleDeleteAction = async (botName) => {
    try {
      await deleteBotHook(botName);
      setAlertText("Bot removido!");
      setAlertColor("success");
    } catch (error) {
      console.log(error);
      setAlertText("Ocorreu um erro ao remover o bot: " + error.message);
      setAlertColor("danger");
    }
    await updateUserBots();
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
