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
            [name]: value
        })
    }

    const handleSubmit = async event => {
        event.preventDefault()
        const valitationErrors = validate(values)
        setErrors(valitationErrors)

        if (hasErrors(valitationErrors)) return

        const payload = {
            username: values.username,
            email: values.email,
            password: values.password
        }
        await register(payload)
        navigate('/login')
    }

    const hasErrors = valitationErrors => Object.keys(valitationErrors).length !== 0

    return { values, errors, handleChange, handleSubmit }
}

export default useRegistrationForm

