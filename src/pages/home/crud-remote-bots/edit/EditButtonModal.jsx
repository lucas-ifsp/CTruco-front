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

const EditButtonModal = ({ isOpen, onClose, updateUserBots }) => {
  const [name, setName] = useState();
  const [url, setUrl] = useState();
  const [port, setPort] = useState();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // await addBotHook(name, auth.uuid, url, port);
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
            {/* <RemoteBotForm
            name={name}
            setName={setName}
            url={url}
            setUrl={setUrl}
            port={port}
            setPort={setPort}
          /> */}
            <div className="name-field">
              <label htmlFor="bot-name-inp">Nome</label>
              <Input
                ref={nameInputRef}
                w={"70%"}
                borderColor={nameFieldColor}
                type="text"
                name="bot-name"
                id="bot-name-inp"
                defaultValue={name}
                onChange={(e) => {
                  setName(e.target.value);
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
                defaultValue={url}
                onChange={(e) => {
                  setUrl(e.target.value);
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
                defaultValue={port}
                onChange={(e) => {
                  setPort(e.target.value);
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
        </form>
      </ModalContent>
    </Modal>
  );
};

export default EditButtonModal;
