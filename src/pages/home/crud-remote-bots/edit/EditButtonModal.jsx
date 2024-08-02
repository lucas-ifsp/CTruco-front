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
import RemoteBotForm from "../bot-info-form/RemoteBotForm";

const EditButtonModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
      <ModalHeader>EDITAR</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <RemoteBotForm />
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="green"
            mr={3}
            onClick={() => {
              onClose();
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

export default EditButtonModal;
