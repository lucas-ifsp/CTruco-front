import useAuth from '../context/useAuth'
import useAxiosPrivate from './useAxiosPrivate'
import useFetchIntel from './useFetchIntel'

const useThrowCard = () => {
    const axiosPrivate = useAxiosPrivate()
    const { auth: { uuid } } = useAuth()
    const fetchIntelSince = useFetchIntel()

    const throwCardAs = async (card, action) => {
        try {
            const url = `/api/v1/games/players/${uuid}/cards/${action}`
            await axiosPrivate.post(url, card)
            fetchIntelSince()
        }
        catch (error) {
            console.log(error.response.headers.authorization)
        }
    }
    return throwCardAs
}

export default useThrowCard