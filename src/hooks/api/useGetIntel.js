import useAuth from '../context/useAuth'
import useAxiosPrivate from './useAxiosPrivate'

const useGetIntel = () => {
    const axiosPrivate = useAxiosPrivate()
    const { auth: { uuid } } = useAuth()

    const getSince = async (lastIntel) => {
        const url = `/api/v1/games/players/${uuid}/intel-since/${lastIntel.timestamp}`
        const { data: { intelSinceBaseTimestamp } } = await axiosPrivate.get(url)
        return intelSinceBaseTimestamp
    }
    return getSince
}

export default useGetIntel