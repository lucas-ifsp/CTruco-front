import { createContext, useState } from 'react'

const GameContext = createContext()

export const GameContextProvider = ({ children }) => {
    const [initialIntel, setInitialIntel] = useState(null)

    function isGameActive() {
        return !!initialIntel
    }

    return (
        <GameContext.Provider value={{ initialIntel, setInitialIntel, isGameActive }}>
            {children}
        </GameContext.Provider>
    )
}

export default GameContext