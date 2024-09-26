import { axiosPrivate } from "../../api/axios";
const useCreateTournament = () => {
  const create = async () => {
    try {
      const url = `/api/v1/tournament`;
      const response = await axiosPrivate.post(url, [
        "LazyBot",
        "DummyBot",
        "MineiroByBueno",
        "VapoBot",
        "UncleBobBot",
        "SkolTable",
        "VeioDoBarBot",
        "W'rkncacnter",
      ]);
      // console.log(response);
      return response.data.payload;
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  return create;
};

export default useCreateTournament;
