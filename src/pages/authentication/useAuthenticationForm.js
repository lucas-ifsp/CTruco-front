import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../../api/AuthenticationApi';
import UserContext from "../../contexts/UserContext";


const useAuthenticationForm = (validate) => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: '',
        password: ''
    })
    const [errors, setErrors] = useState({})
    const { setToken, setUsername: setContextUsername, setUuid } = useContext(UserContext)


    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value.trim()
        })
    }

    const handleSubmit = async event => {
        event.preventDefault();
        const valitationErrors = validate(values)
        setErrors(() => valitationErrors)

        if (hasInputErrors(valitationErrors)) return

        try {
            const requestPayload = { username: values.username, password: values.password }
            const token = await authenticate(requestPayload)
            const tokenPayload = parseJwt(token)
            setToken(token)
            setContextUsername(tokenPayload.username)
            setUuid(tokenPayload.userId)
            navigate('/')
        } catch (error) {
            const requestError = { apiError: error.message }
            setErrors(() => requestError)
        }
    }

    const hasInputErrors = valitationErrors => Object.keys(valitationErrors).length !== 0

    function parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };

    return { values, errors, handleChange, handleSubmit }
}

export default useAuthenticationForm

