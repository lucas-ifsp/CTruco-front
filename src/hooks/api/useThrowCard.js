import useAuth from '../context/useAuth'
import useAxiosPrivate from './useAxiosPrivate'

const useThrowCard = () => {
    const axiosPrivate = useAxiosPrivate()
    const { auth: { uuid } } = useAuth()

    const throwCardAs = async (card, action) => {
        const url = `/api/v1/games/players/${uuid}/cards/${action}`
        await axiosPrivate.post(url, card)
    }
    return throwCardAs
}

export default useThrowCard