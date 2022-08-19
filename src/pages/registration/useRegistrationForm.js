import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSignUp from '../../hooks/api/useSignUp';

const useRegistrationForm = (validate) => {
    const navigate = useNavigate();
    const [signUp, success, apiErrors] = useSignUp();
    const [errors, setErrors] = useState({})

    const [values, setValues] = useState({
        username: '',
        email: '',
        password: ''
    })

    useEffect(() => {
        if (apiErrors.length === 0) return

        const errorTypes = {}

        const userError = apiErrors.find(error => error.includes('usuário'))
        if (userError)
            errorTypes.username = userError

        const emailError = apiErrors.find(error => error.includes('e-mail'))
        if (emailError)
            errorTypes.email = emailError

        const otherError = apiErrors.find(error => !error.includes('usuário') && !error.includes('e-mail'))

        if (otherError)
            errorTypes.apiError = otherError

        setErrors(errorTypes)

    }, [apiErrors])

    useEffect(() => {
        if (!success) return
        navigate('/login')
    }, [success, navigate])


    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value.trim()
        })
    }

    const handleSubmit = async event => {
        event.preventDefault()
        const validationErrors = validate(values)
        setErrors(() => validationErrors)

        if (hasErrors(validationErrors)) return

        const payload = {
            username: values.username,
            email: values.email,
            password: values.password
        }
        await signUp(payload)
    }

    const hasErrors = valitationErrors => Object.keys(valitationErrors).length !== 0

    return { values, errors, handleChange, handleSubmit }
}

export default useRegistrationForm

