import { axiosPrivate } from "../../api/axios";
const useGetRank = () => {
  const getFromDB = async () => {
    try {
      const url = `/api/v1/bots/rank`;
      const response = await axiosPrivate.get(url);
      // console.log(response);
      return response.data.payload;
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  return getFromDB;
};

export default useGetRank;
