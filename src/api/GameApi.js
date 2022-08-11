import axios from "axios"

const ENDPOINT = 'http://localhost:8080'

export const createGameForUserAndBot = async (authorization, payload) => {
    const url = `${ENDPOINT}/api/v1/games/user-bot/`
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': authorization
    }
    try {
        const { data: initialIntel } = await axios.post(url, payload, { headers: headers })
        return initialIntel
    }
    catch (error) {
        console.error(JSON.stringify(error.response.data, null, '  '))
    }
}

export const deleteConcludedGame = async (authorization, uuid) => {
    const url = `${ENDPOINT}/api/v1/games/players/${uuid}`
    const headers = { Authorization: authorization }
    try {
        await axios.delete(url, { headers: headers })
    }
    catch (error) {
        console.error(JSON.stringify(error.response.data, null, '  '))
    }
}