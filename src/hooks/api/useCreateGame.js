import useAuth from '../context/useAuth'
import useIntel from '../context/useIntel'
import useAxiosPrivate from './useAxiosPrivate'

const useCreateGame = () => {
    const axiosPrivate = useAxiosPrivate()
    const { auth } = useAuth()
    const { setIntel } = useIntel()

    const withBot = async (botName) => {
        try {
            const url = `/api/v1/games/user-bot/`
            const data = { userUuid: auth.uuid, botName }
            const { data: initialIntel } = await axiosPrivate.post(url, data)
            setIntel({ last: initialIntel, opponentName: botName })
            return initialIntel;
        }
        catch (error) {
            console.log(error.response.headers.authorization)
        }
    }
    return withBot
}

export default useCreateGame