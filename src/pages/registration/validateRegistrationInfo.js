const validateRegistrationInfo = values => {
    let errors = {}

    if (!values.username.trim())
        errors.username = 'Campo obrigatório'

    if (!values.email.trim())
        errors.email = 'Campo obrigatório'
    else if (!/\S+@\S+\.\S+/.test(values.email))
        errors.email = 'E-mail inválido'

    if (!values.password.trim())
        errors.password = 'Campo obrigatório'
    else if (values.password.length < 6)
        errors.password = 'A senha deve conter no mínimo seis caracteres'

    return errors
}

export default validateRegistrationInfo