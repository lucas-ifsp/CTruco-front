import useAuth from '../context/useAuth'
import useIntel from '../context/useIntel'
import useAxiosPrivate from './useAxiosPrivate'

const useDeleteGame = () => {
    const axiosPrivate = useAxiosPrivate()
    const { auth: { uuid } } = useAuth()
    const { setIntel } = useIntel()

    const deleteConcludedGame = async () => {
        const url = `/api/v1/games/players/${uuid}`
        await axiosPrivate.delete(url)
        setIntel(null)
    }
    return deleteConcludedGame
}

export default useDeleteGame