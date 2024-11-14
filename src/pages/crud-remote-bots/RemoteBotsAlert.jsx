import React, { useEffect, useState } from "react";
import "./RemoteBotsAlert.css";

const RemoteBotsAlert = ({ bootsTrapColor, text, setText }) => {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    console.log(text);
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
          <i className="bi bi-x" onClick={() => handleClose()} />
        </div>
      </div>
    </>
  );
};

export default RemoteBotsAlert;
