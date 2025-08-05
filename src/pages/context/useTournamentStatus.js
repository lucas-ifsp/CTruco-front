import { useContext } from "react";
import TournamentContext from "../tournament/TournamentProvider";

const useTournamentStatus = () => {
  return useContext(TournamentContext);
};

export default useTournamentStatus;
