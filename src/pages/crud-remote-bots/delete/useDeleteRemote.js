import { axiosPrivate } from "../../../api/axios";
const useDeleteRemote = () => {
  const deleteBot = async (botName) => {
    try {
      const url = `/api/v1/remote-bots/${botName.trim()}`;
      return await axiosPrivate.delete(url);
    } catch (error) {
      throw new Error();
    }
  };
  return deleteBot;
};

export default useDeleteRemote;
