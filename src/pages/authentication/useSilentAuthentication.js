import { axiosPrivate } from '../../api/axios';
import useAuth from '../../hooks/context/useAuth';


const useSilentAuthentication = () => {
    const { auth, setAuth } = useAuth()

    const silentlyAuthenticate = async () => {
        try {
            if (auth?.uuid) return false
            const response = await axiosPrivate.get('/refresh-token')
            const token = response.headers.authorization
            const uuid = response.data.uuid
            const username = response.data.username
            setAuth(prev => ({ ...prev, token, uuid, username }))
            console.log('auth')
            return true
        } catch (error) {
            console.log('Logged out. Please sign in.')
            return false
        }
    }
    return silentlyAuthenticate
}

export default useSilentAuthentication