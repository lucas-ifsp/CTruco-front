import { useContext } from "react";
import EvaluateContext from "../evaluate-bot/EvaluateContext";

const useEvaluateStatus = () => {
  return useContext(EvaluateContext);
};

export default useEvaluateStatus;
