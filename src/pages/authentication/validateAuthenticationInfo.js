const validateAuthenticationInfo = values => {
    let errors = {}

    if (!values.username.trim())
        errors.username = 'Campo obrigatório'

    if (!values.password.trim())
        errors.password = 'Campo obrigatório'
    else if (values.password.length < 6)
        errors.password = 'A senha possui seis caracteres ou mais'

    return errors
}

export default validateAuthenticationInfo