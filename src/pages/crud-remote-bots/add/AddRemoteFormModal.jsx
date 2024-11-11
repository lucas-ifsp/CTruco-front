import { React, useState, useEffect, useRef } from "react";
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
import useAddRemote from "./useAddRemote";
import useAuth from "../../../hooks/context/useAuth";
import "../bot-info-form/RemoteBotForm.css";

const AddRemoteFormModal = ({ isOpen, onClose, updateUserBots }) => {
  const [name, setName] = useState();
  const [url, setUrl] = useState();
  const [port, setPort] = useState();
  const { auth } = useAuth();
  const addBotHook = useAddRemote();
  const nameInputRef = useRef(null);
  const urlInputRef = useRef(null);
  const portInputRef = useRef(null);
  const submitButton = useRef(null);
  const [nameFieldColor, setNameFieldColor] = useState("");
  const [urlFieldColor, setUrlFieldColor] = useState("");
  const [portFieldColor, setPortFieldColor] = useState("");
  const [nameWarning, setNameWarning] = useState("");
  const [urlWarning, setUrlWarning] = useState("");
  const [portWarning, setPortWarning] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBotHook(name, auth.uuid, url, port);
    } catch (error) {
      console.log(error);
    }
    await updateUserBots();
  };

  const validateField = (fieldRef, setColor, setWarningMessage) => {
    if (fieldRef.value.trim().length < 4) {
      setColor("red");
      setWarningMessage("campo inválido");
    } else {
      //caractere invisível, não é um espaço!
      setWarningMessage("⠀⠀⠀⠀⠀⠀⠀⠀⠀");
      setColor("green");
    }
  };

  useEffect(() => {
    if (
      nameFieldColor === "red" ||
      urlFieldColor === "red" ||
      portFieldColor === "red"
    ) {
      // DESABILITAR SUBMIT BUTTON AQUI
    }
  }, [nameFieldColor, urlFieldColor, portFieldColor]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Adicionar Bot</ModalHeader>
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
                defaultValue={name}
                onChange={(e) => {
                  setName(e.target.value);
                  validateField(
                    nameInputRef.current,
                    setNameFieldColor,
                    setNameWarning
                  );
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
                  validateField(
                    urlInputRef.current,
                    setUrlFieldColor,
                    setUrlWarning
                  );
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
                  validateField(
                    portInputRef.current,
                    setPortFieldColor,
                    setPortWarning
                  );
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
                onClose();
                handleSubmit(e);
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

export default AddRemoteFormModal;
