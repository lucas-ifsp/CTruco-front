import { axiosPrivate } from "../../api/axios";
const usePlayTournamentMatch = () => {
  const play = async (tournamentId, matchNumber, times) => {
    try {
      const url = `/api/v1/tournament/${tournamentId}/match/${matchNumber}/${times}`;
      const response = await axiosPrivate.post(url);
      console.log(response);
      return response.data.payload;
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  return play;
};

export default usePlayTournamentMatch;
