export function createMessage(intel, uuid) {
    const scoreToString = { 3: 'truco', 6: 'seis', 9: 'nove', 12: 'doze' }
    const description = {
        QUIT: 'correu!',
        QUIT_HAND: 'não aceitou a mão!',
        ACCEPT: 'aceitou!',
    }

    const opponentUsername = intel.players.find(aPlayer => aPlayer.uuid !== uuid).username
    const isOpponentEvent = !!intel.eventPlayerUUID && intel.eventPlayerUUID !== uuid
    const isPlayerTurn = intel.currentPlayerUuid === uuid
    const canThrowCard = intel.possibleActions.includes('PLAY')
    const event = description[intel.event]

    if (intel.event === 'GAME_OVER') return `Game Over - Você ${intel.gameWinner === uuid ? 'Venceu!' : 'Perdeu.'}`
    if (isOpponentEvent && description.hasOwnProperty(intel.event)) return `${opponentUsername} ${event}`

    if (isPlayerTurn) {
        if (canThrowCard) return 'Clique na carta para jogar. Segure o alt e clique na carta para ocultar.'
        if (intel.handPointsProposal) return `${opponentUsername} está pedindo ${scoreToString[intel.handPointsProposal]}`
        if (intel.isMaoDeOnze && intel.handPoints === 1) return 'Mão de Onze! Escolha se você aceita ou corre.'
    }
    return ''
}
