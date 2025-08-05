import { useContext } from "react";
import RemoteBotAlertContext from "../crud-remote-bots/RemoteBotAlertContext";

const useAlertStatus = () => {
  return useContext(RemoteBotAlertContext);
};

export default useAlertStatus;
