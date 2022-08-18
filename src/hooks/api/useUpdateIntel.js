import useAuth from '../context/useAuth'
import useAxiosPrivate from './useAxiosPrivate'

const useFetchIntel = () => {
    const axiosPrivate = useAxiosPrivate()
    const { auth: { uuid } } = useAuth()

    const fetchSince = async (lastIntel) => {
        const url = `/api/v1/games/players/${uuid}/intel-since/${lastIntel.timestamp}`
        const { data: { intelSinceBaseTimestamp } } = await axiosPrivate.get(url)
        return intelSinceBaseTimestamp
    }
    return fetchSince
}

export default useFetchIntel