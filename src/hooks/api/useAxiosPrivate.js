import { useEffect } from "react";
import axios from "../../api/axios";
import useAuth from "../context/useAuth";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const requestIntercept = axios.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = auth?.token;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axios.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = newAccessToken;
                    return await axios(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.request.eject(requestIntercept);
            axios.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh])

    return axios;
}

export default useAxiosPrivate;