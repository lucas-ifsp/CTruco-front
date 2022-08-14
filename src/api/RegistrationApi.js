import axios from "axios"

const ENDPOINT = 'http://localhost:8080'

export const register = async (payload) => {
    try {
        const { data: { uuid } } = await axios.post(`${ENDPOINT}/register`, payload)
        return uuid
    } catch (error) {
        if (!error.response) throw Error('Sistema temporariamente indisponível.')

        const message = error.response.data.message
        const code = error.response.status

        if (code === 409) {
            let errorMessage = ''
            if (message.includes('username')) errorMessage += 'O nome de usuário já existe no sistema.|'
            if (message.includes('email')) errorMessage += 'O e-mail já existe no sistema.'
            throw Error(errorMessage)
        }

        throw Error('Algo deu errado.')
    }
}
