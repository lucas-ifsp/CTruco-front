import axios from "axios"

const ENDPOINT = 'http://localhost:8080'

export const authenticate = async (payload) => {
    try {
        const { headers: { authorization: token }, data: { refreshToken, uuid } } = await axios.post(`${ENDPOINT}/login`, payload)
        return { token, uuid, refreshToken }
    } catch (error) {
        if (!error.response) throw Error('Sistema temporariamente indisponível.')
        if (error.response.status === 401) throw Error('Usuário ou senha inválidos.')
        throw Error('Algo deu errado.')
    }
}

