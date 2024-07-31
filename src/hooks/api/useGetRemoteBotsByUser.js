import useAxiosPrivate from "./useAxiosPrivate";

const useGetRemoteBotsByUserId = () => {
  const axiosPrivate = useAxiosPrivate();

  const fetchRemoteOnes = async (userId) => {
    try {
      const url = `/api/v1/remote-bots/user/${userId}`;
      return await axiosPrivate.get(url);
    } catch (error) {
      console.log(error.response.headers.authorization);
    }
  };
  return fetchRemoteOnes;
};

export default useGetRemoteBotsByUserId;
