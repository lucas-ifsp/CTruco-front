import { axiosPrivate } from "../../api/axios";
import useAuth from "../../hooks/context/useAuth";

const useUserMatchHistory = () => {
  const { auth } = useAuth();
  const getHistory = async () => {
    try {
      const url = `/api/v1/games/players/${auth.uuid}/match-history`;
      const response = await axiosPrivate.get(url);
      // console.log(response);
      return response.data.games;
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  return getHistory;
};

export default useUserMatchHistory;
