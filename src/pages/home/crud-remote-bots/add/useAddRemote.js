import { axiosPrivate } from "../../../../api/axios";
const useAddRemote = () => {
  const AddBot = async () => {
    const body = {
      name: "Gustavo",
      userId: "e9c339b4-cd4e-4cdf-8847-17dba37d0b31",
      url: "http://localhost",
      port: "8080",
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
