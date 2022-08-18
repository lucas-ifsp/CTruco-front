import useAuth from '../context/useAuth'
import useAxiosPrivate from './useAxiosPrivate'

const usePoints = () => {
    const axiosPrivate = useAxiosPrivate()
    const { auth: { uuid } } = useAuth()

    const decideTo = async (action) => {
        const url = `/api/v1/games/players/${uuid}/${action}`
        await axiosPrivate.post(url)
    }
    return decideTo
}

export default usePoints