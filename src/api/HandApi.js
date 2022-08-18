import axios from "axios"

const ENDPOINT = 'http://localhost:8080'

export const getMissingIntel = async ({ token, uuid, lastIntelTimestamp }) => {
    const url = `${ENDPOINT}/api/v1/games/players/${uuid}/intel-since/${lastIntelTimestamp}`
    const headers = {
        'Content-Type': 'application/json',
        Authorization: token,
    }
    try {
        const { data: { intelSinceBaseTimestamp } } = await axios.get(url, { headers: headers })
        return intelSinceBaseTimestamp
    } catch (error) {
        console.log(error.response)
        //console.error(JSON.stringify(error.response.data, null, '  '))
    }
}

export const postThrowingCard = async ({ token, uuid, card, action }) => {
    const url = `${ENDPOINT}/api/v1/games/players/${uuid}/cards/${action}`
    const payload = { rank: card.rank, suit: card.suit }
    const headers = {
        'Content-Type': 'application/json',
        Authorization: token,
    }
    try {
        await axios.post(url, payload, { headers: headers })
    }
    catch (error) {
        if (!error.response) throw Error('Sistema temporariamente indisponível.')
        if (error.response.status === 401) {
            console.log("expired token")
            //await refreshToken() // TODO CHECK HOW TO HANDLE EXPIRED TOKENS
        }
        throw Error('Algo deu errado.')
    }
}

export const postPointsDecision = async ({ token, uuid, action }) => {
    const url = `${ENDPOINT}/api/v1/games/players/${uuid}/${action}`
    const headers = { Authorization: token }
    try {
        await axios.post(url, undefined, { headers: headers })
    }
    catch (error) {
        console.log(error.response)
        //console.error(JSON.stringify(error.response.data, null, '  '))
    }
}
