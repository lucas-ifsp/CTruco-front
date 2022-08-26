import { Navigate, Outlet } from "react-router-dom"
import useSilentSignIn from "../../hooks/api/useSilentSignIn"
import useAuth from "../../hooks/context/useAuth"
import useIntel from "../../hooks/context/useIntel"

export const RedirectWhenAuth = () => {
    const {auth} = useAuth()  
    const {setIntel} = useIntel()
    const silentlySignIn = useSilentSignIn()

    const silentlyLogin = async () => await silentlySignIn()
    silentlyLogin()

    setIntel(null)
    return (!auth ? <Outlet/> : <Navigate to='/'/> )
}

export default RedirectWhenAuth