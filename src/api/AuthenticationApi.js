import axios from "axios"

const ENDPOINT = 'http://localhost:8080'

export const authenticate = async (payload) => {
    try {
        const { headers: { authorization } } = await axios.post(`${ENDPOINT}/login`, payload)
        return authorization
    } catch (error) {
        if (!error.response) throw Error('Sistema temporariamente indisponível.')
        if (error.response.status === 403) throw Error('Usuário ou senha inválidos.')
        throw Error('Algo deu errado.')
    }
}

