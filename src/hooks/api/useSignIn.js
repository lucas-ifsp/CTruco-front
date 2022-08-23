import { useState } from 'react'
import { axiosPrivate } from '../../api/axios'
import useAuth from '../context/useAuth'

const useSignIn = () => {
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState()
    const { setAuth } = useAuth()

    const signIn = async (payload) => {
        try {
            setError(null)
            const { headers: { authorization: token }, data: { refreshToken, uuid } } = await axiosPrivate.post(`/login`, payload)
            setAuth({ token, uuid, refreshToken, username: payload.username })
            setSuccess(true)
        } catch (error) {
            console.log(error.message)
            if (!error.response) setError('Sistema temporariamente indisponível.')
            else if (error.response.status === 401) setError('Usuário ou senha inválidos.')
            else setError('Algo deu errado.')
        }
    }
    return [signIn, success, error]
}

export default useSignIn