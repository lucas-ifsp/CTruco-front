import { useState, createContext } from "react";

const EvaluateContext = createContext();
export const EvaluationProvider = ({ children }) => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState();
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluateResultString, setEvaluateResultString] = useState("");
  const [selectedBot, setSelectedBot] = useState("DummyBot");

  return (
    <EvaluateContext.Provider
      value={{
        isSimulating,
        setIsSimulating,
        simulationResult,
        setSimulationResult,
        isEvaluating,
        setIsEvaluating,
        evaluateResultString,
        setEvaluateResultString,
        selectedBot,
        setSelectedBot,
      }}
    >
      {children}
    </EvaluateContext.Provider>
  );
};

export default EvaluateContext;
