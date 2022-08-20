import axios from '../../api/axios';
import useAuth from '../context/useAuth';

const useRefreshToken = () => {
    const { setAuth, auth } = useAuth();

    const refresh = async () => {
        const headers = { Authorization: `Bearer ${auth?.refreshToken}` }
        const { headers: { authorization: accessToken } } = await axios.get('/refresh-token', { headers: headers })
        setAuth(prev => ({ ...prev, token: accessToken }));
        return accessToken;
    }
    return refresh;
};

export default useRefreshToken;