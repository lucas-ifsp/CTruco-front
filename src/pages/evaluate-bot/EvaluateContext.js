import { useState, createContext } from "react";

const EvaluateContext = createContext();
export const EvaluationProvider = ({ children }) => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState();
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluateResultString, setEvaluateResultString] = useState("");

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
      }}
    >
      {children}
    </EvaluateContext.Provider>
  );
};

export default EvaluateContext;
