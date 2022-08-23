import useAuth from '../context/useAuth'
import useIntel from '../context/useIntel'
import useAxiosPrivate from './useAxiosPrivate'

const useFetchIntel = () => {
    const axiosPrivate = useAxiosPrivate()
    const { auth: { uuid } } = useAuth()
    const { intel, setIntel } = useIntel()

    const fetchIntelSince = async () => {
        try {
            const lastIntel = intel.last
            const url = `/api/v1/games/players/${uuid}/intel-since/${lastIntel.timestamp}`
            const { data: { intelSinceBaseTimestamp: intelSince } } = await axiosPrivate.get(url)

            if (intelSince.length === 0) return

            const missing = [lastIntel, ...intelSince]
            const mostRecent = intelSince.slice(-1)[0]

            setIntel(prevState => ({ ...prevState, last: mostRecent, missing }))
        }
        catch (error) {
            console.log(error.response.headers.authorization)
        }
    }
    return fetchIntelSince
}

export default useFetchIntel