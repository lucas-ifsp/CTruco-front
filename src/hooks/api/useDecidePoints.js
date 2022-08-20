import useAuth from '../context/useAuth'
import useAxiosPrivate from './useAxiosPrivate'
import useFetchIntel from './useFetchIntel'

const useDecidePoints = () => {
    const axiosPrivate = useAxiosPrivate()
    const { auth: { uuid } } = useAuth()
    const fetchIntelSince = useFetchIntel()

    const decideTo = async (action) => {
        const url = `/api/v1/games/players/${uuid}/${action}`
        await axiosPrivate.post(url)
        fetchIntelSince()
    }
    return decideTo
}

export default useDecidePoints