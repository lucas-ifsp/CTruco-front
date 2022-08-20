import { useState } from 'react'
import axios from '../../api/axios'

const useSignUp = () => {
    const [success, setSuccess] = useState(false)
    const [errors, setErrors] = useState([])

    const signUp = async (payload) => {
        try {
            setErrors([])
            await axios.post(`/register`, payload)
            setSuccess(true)
        } catch (error) {
            console.log(error.message)
            if (!error.response) {
                setErrors('Sistema temporariamente indisponível.')
            }
            if (error.response.status === 409) {
                const message = error.response.data.message
                if (message.includes('username'))
                    setErrors(prevState => ([...prevState, 'O nome de usuário já existe no sistema.']))
                if (message.includes('email'))
                    setErrors(prevState => ([...prevState, 'O e-mail já existe no sistema.']))
                return
            }
            else setErrors('Algo deu errado.')
        }
    }
    return [signUp, success, errors]
}

export default useSignUp

