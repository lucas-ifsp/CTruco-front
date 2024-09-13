import { axiosPrivate } from "../../api/axios";
const useEvaluateBot = () => {
  const evaluate = async (bot) => {
    try {
      const url = `/api/v1/bots/evaluate/${bot}`;
      const response = await axiosPrivate.post(url);
      console.log(response);
      console.log(response.data.payload);
      return response.data.payload;
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  return evaluate;
};

export default useEvaluateBot;
