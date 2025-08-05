import useAxiosPrivate from "../../hooks/api/useAxiosPrivate";
const useGetRank = () => {
  const axiosPrivate = useAxiosPrivate();
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
