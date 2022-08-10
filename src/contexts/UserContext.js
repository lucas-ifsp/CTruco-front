import { createContext, useState } from 'react';

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [username, setUsername] = useState(null)
    const [token, setToken] = useState(null)
    const [uuid, setUuid] = useState(null)

    const isAuthenticated = () => !!token

    return (
        <UserContext.Provider value={{ username, setUsername, uuid, setUuid, token, setToken, isAuthenticated }}>
            {children}
        </UserContext.Provider>
    )
}
export default UserContext