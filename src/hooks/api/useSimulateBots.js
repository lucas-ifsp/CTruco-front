import useAxiosPrivate from "./useAxiosPrivate";

const useSimulateBots = () => {
  const axiosPrivate = useAxiosPrivate();

  const fetchSimulationResult = async (bot1Name, bot2Name, times) => {
    const body = {
      bot1Name: bot1Name,
      bot2Name: bot2Name,
      times: times,
    };
    try {
      const url = `/api/v1/games/bot-bot`;
      return await axiosPrivate.post(url, body);
    } catch (error) {
      console.log(error.response.headers.authorization);
    }
  };
  return fetchSimulationResult;
};

export default useSimulateBots;
