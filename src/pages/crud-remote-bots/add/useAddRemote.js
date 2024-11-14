import { axiosPrivate } from "../../../api/axios";
const useAddRemote = () => {
  const AddBot = async (name, userId, url, port, repositoryUrl) => {
    const body = {
      name: name,
      userId: userId,
      url: url,
      port: port,
      repositoryUrl: repositoryUrl,
    };
    try {
      const url = `/api/v1/remote-bots`;
      return await axiosPrivate.post(url, JSON.stringify(body));
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };
  return AddBot;
};

export default useAddRemote;
