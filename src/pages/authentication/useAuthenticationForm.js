import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../../api/AuthenticationApi';
import useAuth from '../../hooks/context/useAuth';

const useAuthenticationForm = (validate) => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: '',
        password: ''
    })
    const [errors, setErrors] = useState({})
    const { setAuth } = useAuth()


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
            const response = await authenticate(requestPayload)
            setAuth({ ...response, username: values.username })
            navigate('/')
        } catch (error) {
            const requestError = { apiError: error.message }
            setErrors(() => requestError)
        }
    }

    const hasInputErrors = valitationErrors => Object.keys(valitationErrors).length !== 0

    return { values, errors, handleChange, handleSubmit }
}

export default useAuthenticationForm

