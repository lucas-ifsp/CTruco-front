import axios from "axios"

const ENDPOINT = 'http://localhost:8080'

export const authenticate = async (payload) => {
    try {
        const { headers: { authorization } } = await axios.post(`${ENDPOINT}/login`, payload)
        return authorization
    } catch (error) {
        console.error(error)
    }
}

