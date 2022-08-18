import useAuth from '../context/useAuth'
import useAxiosPrivate from './useAxiosPrivate'
import useFetchIntel from './useFetchIntel'

const useThrowCard = () => {
    const axiosPrivate = useAxiosPrivate()
    const { auth: { uuid } } = useAuth()
    const fetchIntelSince = useFetchIntel()

    const throwCardAs = async (card, action) => {
        const url = `/api/v1/games/players/${uuid}/cards/${action}`
        await axiosPrivate.post(url, card)
        fetchIntelSince()
    }
    return throwCardAs
}

export default useThrowCard