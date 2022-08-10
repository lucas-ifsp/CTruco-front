import { createContext, useState } from 'react'

const GameContext = createContext()

export const GameContextProvider = ({ children }) => {
    const [initialIntel, setInitialIntel] = useState(null)
    const isGameActive = () => !!initialIntel && Object.keys(initialIntel).length > 0
    const isGameWaitingOpponent = () => !!initialIntel && Object.keys(initialIntel).length === 0

    return (
        <GameContext.Provider value={{ initialIntel, setInitialIntel, isGameActive, isGameWaitingOpponent }}>
            {children}
        </GameContext.Provider>
    )
}

export default GameContext