import useAuth from '../context/useAuth'
import useIntel from '../context/useIntel'
import useAxiosPrivate from './useAxiosPrivate'

const useDeleteGame = () => {
    const axiosPrivate = useAxiosPrivate()
    const { auth: { uuid } } = useAuth()
    const { setIntel } = useIntel()

    const deleteConcluded = async () => {
        const url = `/api/v1/games/players/${uuid}`
        await axiosPrivate.delete(url)
        setIntel(null)
    }
    return deleteConcluded
}

export default useDeleteGame