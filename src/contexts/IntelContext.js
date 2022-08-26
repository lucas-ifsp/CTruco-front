import { createContext, useState } from 'react'

const IntelContext = createContext()

export const IntelContextProvider = ({ children }) => {
    const [intel, setIntel] = useState()

    return (
        <IntelContext.Provider value={{ intel, setIntel }}>
            {children}
        </IntelContext.Provider>
    )
}

export default IntelContext