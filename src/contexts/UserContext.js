import { createContext, useState } from 'react';

const UserContext = createContext();

export function UserContextProvider({ children }) {
    const [username, setUsername] = useState(null)
    const [token, setToken] = useState(null)
    const [uuid, setUuid] = useState(null)

    function isAuthenticated() {
        return !!token
    }

    return (
        <UserContext.Provider value={{ username, setUsername, uuid, setUuid, token, setToken, isAuthenticated }}>
            {children}
        </UserContext.Provider>
    )
}
export default UserContext