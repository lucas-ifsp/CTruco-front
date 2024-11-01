import { useState, createContext } from "react";

const TournamentContext = createContext();
export const TournamentProvider = ({ children }) => {
  const [title, setTitle] = useState("");
  const [championship, setChampionship] = useState("");
  const [finalMatchTimes, setFinalMatchTimes] = useState(31);
  const [times, setTimes] = useState(31);

  return (
    <TournamentContext.Provider
      value={{
        title,
        setTitle,
        championship,
        setChampionship,
        finalMatchTimes,
        setFinalMatchTimes,
        times,
        setTimes,
      }}
    >
      {children}
    </TournamentContext.Provider>
  );
};

export default TournamentContext;
