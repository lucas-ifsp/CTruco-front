const validateRegistrationInfo = values => {
    let errors = {}

    if (!values.username)
        errors.username = 'Campo obrigatório'

    if (!values.email)
        errors.email = 'Campo obrigatório'
    else if (!/\S+@\S+\.\S+/.test(values.email))
        errors.email = 'E-mail inválido'

    if (!values.password)
        errors.password = 'Campo obrigatório'
    else if (values.password.length < 6)
        errors.password = 'A senha deve conter no mínimo seis caracteres'

    return errors
}

export default validateRegistrationInfo