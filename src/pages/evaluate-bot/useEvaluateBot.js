import { axiosPrivate } from "../../api/axios";
const useEvaluateBot = () => {
  const evaluate = async (bot) => {
    try {
      const url = `/api/v1/bots/evaluate/${bot}`;
      const response = await axiosPrivate.post(url);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  return evaluate;
};

export default useEvaluateBot;
