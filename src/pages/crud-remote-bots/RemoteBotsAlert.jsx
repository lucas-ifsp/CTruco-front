import React, { useEffect, useState } from "react";
import useAlertStatus from "../context/useAlertStatus";
import "./RemoteBotsAlert.css";

const RemoteBotsAlert = () => {
  const [isHidden, setIsHidden] = useState(false);
  const {
    alertText: text,
    setAlertText: setText,
    alertColor: bootsTrapColor,
  } = useAlertStatus();

  useEffect(() => {
    setIsHidden(text === "" ? true : false);
  }, [text]);

  const handleClose = () => {
    setText("");
  };

  return (
    <>
      <div className="remote-bots-alert">
        <div
          className={`alert alert-${bootsTrapColor}`}
          hidden={isHidden}
          role="alert"
        >
          {text}
          <i
            style={{ fontSize: "20px" }}
            className="bi bi-x"
            onClick={() => handleClose()}
          />
        </div>
      </div>
    </>
  );
};

export default RemoteBotsAlert;
