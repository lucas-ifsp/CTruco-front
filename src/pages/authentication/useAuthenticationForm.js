import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useSignIn from '../../hooks/api/useSignIn';

const useAuthenticationForm = (validate) => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';

    const [values, setValues] = useState({
        username: '',
        password: ''
    })
    const [errors, setErrors] = useState({})
    const [signIn, success, apiError] = useSignIn()

    useEffect(() => {
        setErrors(prevState => ({ ...prevState, apiError }))
    }, [apiError])

    useEffect(() => {
        if (!success) return
        navigate(from, { replace: true })
    }, [success, navigate, from])

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

        signIn({ username: values.username, password: values.password })
    }

    const hasInputErrors = valitationErrors => Object.keys(valitationErrors).length !== 0

    return { values, errors, handleChange, handleSubmit }
}

export default useAuthenticationForm

