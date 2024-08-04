import { axiosPrivate } from "../../../../api/axios";
const useAddRemote = () => {
  const AddBot = async (name, userId, url, port) => {
    const body = {
      name: name,
      userId: userId,
      url: url,
      port: port,
    };
    try {
      const url = `/api/v1/remote-bots`;
      return await axiosPrivate.post(url, JSON.stringify(body));
    } catch (error) {
      console.log(error.response.headers.authorization);
    }
  };
  return AddBot;
};

export default useAddRemote;
