import { useState, createContext } from "react";

const RemoteBotAlertContext = createContext();
export const AlertStatusProvider = ({ children }) => {
  const [alertColor, setAlertColor] = useState("info");
  const [alertText, setAlertText] = useState(
    "Remova um bot clicando no icone da lixeira"
  );
  return (
    <RemoteBotAlertContext.Provider
      value={{
        alertColor,
        setAlertColor,
        alertText,
        setAlertText,
      }}
    >
      {children}
    </RemoteBotAlertContext.Provider>
  );
};

export default RemoteBotAlertContext;
