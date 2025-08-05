import useAxiosPrivate from "../../hooks/api/useAxiosPrivate";
const useCreateTournament = () => {
  const axiosPrivate = useAxiosPrivate();
  const create = async (
    participants,
    times,
    finalAndThirdPlaceMatchTimes
  ) => {
    try {
      const url = `/api/v1/tournament`;
      const response = await axiosPrivate.post(url, {
        participants: participants,
        times: times,
        finalAndThirdPlaceMatchTimes: finalAndThirdPlaceMatchTimes,
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
