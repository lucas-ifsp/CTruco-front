import { createContext, useState } from 'react'

const IntelContext = createContext()

export const IntelContextProvider = ({ children }) => {
    const [intel, setIntel] = useState()

    //const isGameActive = () => !!initialIntel && Object.keys(initialIntel).length > 0
    //const isGameWaitingOpponent = () => !!initialIntel && Object.keys(initialIntel).length === 0

    return (
        <IntelContext.Provider value={{ intel, setIntel }}>
            {children}
        </IntelContext.Provider>
    )
}

export default IntelContext