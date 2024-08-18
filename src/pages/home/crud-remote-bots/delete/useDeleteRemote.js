import { axiosPrivate } from "../../../../api/axios";
const useDeleteRemote = () => {
  const deleteBot = async (botName) => {
    try {
      const url = `/api/v1/remote-bots/${botName.trim()}`;
      return await axiosPrivate.delete(url);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  return deleteBot;
};

export default useDeleteRemote;
