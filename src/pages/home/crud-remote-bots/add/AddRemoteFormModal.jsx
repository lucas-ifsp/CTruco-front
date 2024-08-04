import { React, useState } from "react";
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
import useAddRemote from "./useAddRemote";
import useAuth from "../../../../hooks/context/useAuth";

const AddRemoteFormModal = ({ isOpen, onClose, updateUserBots }) => {
  const [name, setName] = useState();
  const [url, setUrl] = useState();
  const [port, setPort] = useState();
  const { auth } = useAuth();
  const addBotHook = useAddRemote();
  const handleSubmit = async () => {
    await addBotHook(name, auth.uuid, url, port);
    await updateUserBots();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>ADICIONAR BOT</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <RemoteBotForm
            name={name}
            setName={setName}
            url={url}
            setUrl={setUrl}
            port={port}
            setPort={setPort}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="green"
            type="submit"
            mr={3}
            onClick={() => {
              onClose();
              handleSubmit();
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

export default AddRemoteFormModal;
