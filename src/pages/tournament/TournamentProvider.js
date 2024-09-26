import { useState, createContext } from "react";

const TournamentContext = createContext();
export const TournamentProvider = ({ children }) => {
  const [championship, setChampionship] = useState("");

  return (
    <TournamentContext.Provider
      value={{
        championship,
        setChampionship,
      }}
    >
      {children}
    </TournamentContext.Provider>
  );
};

export default TournamentContext;
