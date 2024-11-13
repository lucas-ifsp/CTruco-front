import { axiosPrivate } from "../../../api/axios";
const useEditRemote = () => {
  const EditBot = async (payload) => {
    const prevName = payload.prevName;
    const body = {
      name: payload.name,
      userId: payload.userId,
      url: payload.url,
      port: payload.port,
      repositoryUrl: payload.repositoryUrl,
    };
    try {
      const url = `/api/v1/remote-bots/${prevName}`;
      return await axiosPrivate.put(url, JSON.stringify(body));
    } catch (error) {
      console.log(error.response.headers.authorization);
    }
  };
  return EditBot;
};

export default useEditRemote;
