import axios from "axios"

const ENDPOINT = 'http://localhost:8080'

export const register = async (signUpPayload) => {
    try {
        const { data: { uuid } } = await axios.post(`${ENDPOINT}/register`, signUpPayload)
        return uuid
    } catch (error) {
        console.error(error)
    }
}
