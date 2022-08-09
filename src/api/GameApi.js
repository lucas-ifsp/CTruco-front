import axios from "axios"

const endpoint = 'http://localhost:8080'


export const getMissingIntel = async ({ token, uuid, lastIntelTimestamp }) => {
    const url = `${endpoint}/api/v1/games/players/${uuid}/intel-since/${lastIntelTimestamp}`
    const headers = {
        'Content-Type': 'application/json',
        Authorization: token,
    }
    try {
        const { data: { intelSinceBaseTimestamp } } = await axios.get(url, { headers: headers })
        return intelSinceBaseTimestamp
    } catch (error) {
        console.error(error)
    }
}

export const postThrowingCard = async ({ token, uuid, card, action }) => {
    const url = `${endpoint}/api/v1/games/players/${uuid}/cards/${action}`
    const payload = { rank: card.rank, suit: card.suit }
    const headers = {
        'Content-Type': 'application/json',
        Authorization: token,
    }
    try { await axios.post(url, payload, { headers: headers }) }
    catch (error) { console.error(error) }
}

export const postPointsDecision = async ({ token, uuid, action }) => {
    const url = `${endpoint}/api/v1/games/players/${uuid}/${action}`
    const headers = { Authorization: token }
    try { await axios.post(url, undefined, { headers: headers }) }
    catch (error) { console.error(error) }
}
