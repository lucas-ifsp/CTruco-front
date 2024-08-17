import { React, useState, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
} from "@chakra-ui/react";
import useEditRemote from "./useEditRemote";
import useAuth from "../../../../hooks/context/useAuth";

const EditButtonModal = ({
  isOpen,
  onClose,
  updateUserBots,
  prevName,
  prevUrl,
  prevPort,
}) => {
  const { auth } = useAuth();

  const [newName, setNewName] = useState();
  const [newUrl, setNewUrl] = useState();
  const [newPort, setNewPort] = useState();

  const [nameFieldColor, setNameFieldColor] = useState("red");
  const [urlFieldColor, setUrlFieldColor] = useState("red");
  const [portFieldColor, setPortFieldColor] = useState("red");

  const [nameWarning, setNameWarning] = useState("mensagem de aviso");
  const [urlWarning, setUrlWarning] = useState("mensagem de aviso");
  const [portWarning, setPortWarning] = useState("mensagem de aviso");

  const nameInputRef = useRef(null);
  const urlInputRef = useRef(null);
  const portInputRef = useRef(null);
  const submitButton = useRef(null);

  const editBotHook = useEditRemote();

  const validateFields = () => {
    const validateField = (fieldRef, setColor, setWarningMessage) => {
      if (fieldRef.value.trim().length < 4) {
        setColor("red");
        setWarningMessage("campo inválido");
      } else {
        setWarningMessage("");
        setColor("green");
      }
    };
    // definir condições para validar os campos
    const nameField = nameInputRef.current;
    const urlField = urlInputRef.current;
    const portField = portInputRef.current;
    validateField(nameField, setNameFieldColor, setNameWarning);
    validateField(urlField, setUrlFieldColor, setUrlWarning);
    validateField(portField, setPortFieldColor, setPortWarning);
  };

  const handleSubmit = async () => {
    const payload = {
      prevName: prevName,
      name: newName,
      userId: auth.uuid,
      url: newUrl,
      port: newPort,
    };
    await editBotHook(payload);
    await updateUserBots();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>EDITAR</ModalHeader>
        <ModalCloseButton />
        <form className="bot-info-form">
          <ModalBody className="info-form-content">
            <div className="name-field">
              <label htmlFor="bot-name-inp">Nome</label>
              <Input
                ref={nameInputRef}
                w={"70%"}
                borderColor={nameFieldColor}
                type="text"
                name="bot-name"
                id="bot-name-inp"
                placeholder={prevName}
                onChange={(e) => {
                  setNewName(e.target.value);
                  validateFields();
                }}
              />
              <p style={{ width: "100px", color: "red", fontSize: "12px" }}>
                {nameWarning}
              </p>
            </div>
            <div className="url-field">
              <label htmlFor="bot-url-inp">Url</label>
              <Input
                ref={urlInputRef}
                borderColor={urlFieldColor}
                w={"70%"}
                type="text"
                name="bot-url"
                id="bot-url-inp"
                placeholder={prevUrl}
                onChange={(e) => {
                  setNewUrl(e.target.value);
                  validateFields();
                }}
              />
              <p style={{ width: "100px", color: "red", fontSize: "12px" }}>
                {urlWarning}
              </p>
            </div>
            <div className="port-field">
              <label htmlFor="bot-port-inp">Port</label>
              <Input
                ref={portInputRef}
                borderColor={portFieldColor}
                w={"70%"}
                type="text"
                name="bot-port"
                id="bot-port-inp"
                placeholder={prevPort}
                onChange={(e) => {
                  setNewPort(e.target.value);
                  validateFields();
                }}
              />
              <p style={{ width: "100px", color: "red", fontSize: "12px" }}>
                {portWarning}
              </p>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              ref={submitButton}
              colorScheme="green"
              type="submit"
              mr={3}
              onClick={(e) => {
                e.preventDefault();
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
        </form>
      </ModalContent>
    </Modal>
  );
};

export default EditButtonModal;
