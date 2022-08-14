import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../api/RegistrationApi';

const useRegistrationForm = (validate) => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({})

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

        try {
            const payload = {
                username: values.username,
                email: values.email,
                password: values.password
            }
            await register(payload)
            navigate('/login')
        } catch (error) {
            const message = error.message
            if (message.includes('usuário') || message.includes('e-mail')) {
                const messageParts = message.split('|')

                messageParts.forEach((part) => {
                    if (part.includes('usuário')) setErrors(prevState => ({ ...prevState, username: part }))
                    if (part.includes('e-mail')) setErrors(prevState => ({ ...prevState, email: part }))
                })
            } else {
                setErrors(() => ({ apiError: error.message }))
            }
        }
    }

    const hasErrors = valitationErrors => Object.keys(valitationErrors).length !== 0

    return { values, errors, handleChange, handleSubmit }
}

export default useRegistrationForm

