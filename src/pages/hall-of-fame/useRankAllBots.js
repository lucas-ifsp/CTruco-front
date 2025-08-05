import { axiosPrivate } from "../../api/axios";
const useRankAllBots = () => {
  const rankAvailableOnes = async () => {
    try {
      const url = `/api/v1/bots/rank`;
      const response = await axiosPrivate.post(url);
      // console.log(response);
      return response.data;
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  return rankAvailableOnes;
};

export default useRankAllBots;
