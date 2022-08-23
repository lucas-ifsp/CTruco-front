import { axiosPrivate } from '../../api/axios';
import useAuth from '../context/useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth()

    const refresh = async () => {
        const { headers: { authorization: accessToken } } = await axiosPrivate.get('/refresh-token')
        setAuth(prev => ({ ...prev, token: accessToken }))
        return accessToken
    }

    const deleteTokens = async () => {
        await axiosPrivate.delete('/refresh-token')
        setAuth(null)
    }

    return { refresh, deleteTokens }
}

export default useRefreshToken