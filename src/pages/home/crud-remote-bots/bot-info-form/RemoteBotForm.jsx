import React, { useEffect, useRef } from "react";
import { Input } from "@chakra-ui/react";
import "./RemoteBotForm.css";
import { useState } from "react";
const RemoteBotForm = ({ name, setName, url, setUrl, port, setPort }) => {
  const nameInputRef = useRef(null);
  const urlInputRef = useRef(null);
  const portInputRef = useRef(null);
  const [nameFieldColor, setNameFieldColor] = useState("red");
  const [urlFieldColor, setUrlFieldColor] = useState("red");
  const [portFieldColor, setPortFieldColor] = useState("red");
  const [nameWarning, setNameWarning] = useState("mensagem de aviso");
  const [urlWarning, setUrlWarning] = useState("mensagem de aviso");
  const [portWarning, setPortWarning] = useState("mensagem de aviso");

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
    // return botToString.toLowerCase().includes(content.toLowerCase());
    const nameField = nameInputRef.current;
    const urlField = urlInputRef.current;
    const portField = portInputRef.current;
    validateField(nameField, setNameFieldColor, setNameWarning);
    validateField(urlField, setUrlFieldColor, setUrlWarning);
    validateField(portField, setPortFieldColor, setPortWarning);
  };

  useEffect(() => {
    validateFields();
  }, []);

  return (
    <form className="bot-info-form">
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
    </form>
  );
};

export default RemoteBotForm;
