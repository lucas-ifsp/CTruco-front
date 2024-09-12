import { useState, createContext } from "react";

const EvaluateContext = createContext();
export const EvaluationProvider = ({ children }) => {
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluateResultString, setEvaluateResultString] = useState({});

  return (
    <EvaluateContext.Provider
      value={{
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
