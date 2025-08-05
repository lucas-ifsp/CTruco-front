import useAxiosPrivate from "./useAxiosPrivate";

const useGetBotNames = () => {
  const axiosPrivate = useAxiosPrivate();

  const fetchBotNames = async () => {
    try {
      const url = `/api/v1/bots`;
      return await axiosPrivate.get(url);
    } catch (error) {
      console.log(error.response.headers.authorization);
    }
  };
  return fetchBotNames;
};

export default useGetBotNames;
