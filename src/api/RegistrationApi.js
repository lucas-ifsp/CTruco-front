import axios from "axios"

const ENDPOINT = 'http://localhost:8080'

export const register = async (payload) => {
    try {
        const { data: { uuid } } = await axios.post(`${ENDPOINT}/register`, payload)
        return uuid
    } catch (error) {
        console.error(error)
    }
}
