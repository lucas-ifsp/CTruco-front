import React, { useEffect } from "react";
import { Input } from "@chakra-ui/react";
import "./RemoteBotForm.css";
import { useState } from "react";
const RemoteBotForm = (name, url, port) => {
  const [nameWarning, setNameWarning] = useState("mensagem de aviso");
  const [urlWarning, setUrlWarning] = useState("mensagem de aviso");
  const [portWarning, setPortWarning] = useState("mensagem de aviso");

  useEffect(() => {}, []);

  return (
    <form className="bot-info-form">
      <div className="name-field">
        <label htmlFor="bot-name-inp">Nome</label>
        <Input
          w={"70%"}
          borderColor={"#ccc"}
          type="text"
          name="bot-name"
          id="bot-name-inp"
          defaultValue={() => {
            if (name) {
              return name;
            }
            return "";
          }}
        />
        <p style={{ color: "red", fontSize: "12px" }}>{nameWarning}</p>
      </div>
      <div className="url-field">
        <label htmlFor="bot-url-inp">Url</label>
        <Input
          w={"70%"}
          borderColor={"#ccc"}
          type="text"
          name="bot-url"
          id="bot-url-inp"
          defaultValue={() => {
            if (url) {
              return url;
            }
            return "";
          }}
        />
        <p style={{ color: "red", fontSize: "12px" }}>{urlWarning}</p>
      </div>
      <div className="port-field">
        <label htmlFor="bot-port-inp">Port</label>
        <Input
          w={"70%"}
          borderColor={"#ccc"}
          type="text"
          name="bot-port"
          id="bot-port-inp"
          defaultValue={() => {
            if (port) {
              return port;
            }
            return "";
          }}
        />
        <p style={{ color: "red", fontSize: "12px" }}>{portWarning}</p>
      </div>
    </form>
  );
};

export default RemoteBotForm;
