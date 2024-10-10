import { axiosPrivate } from "../../api/axios";
const useCreateTournament = () => {
  const create = async (participants, times) => {
    try {
      const url = `/api/v1/tournament`;
      const response = await axiosPrivate.post(url, {
        participants: participants,
        times: times,
      });
      // console.log(response);
      return response.data.payload;
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
    }
  };
  return create;
};

export default useCreateTournament;
