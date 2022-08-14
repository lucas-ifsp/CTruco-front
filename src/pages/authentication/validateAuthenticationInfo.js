const validateAuthenticationInfo = values => {
    let errors = {}

    if (!values.username)
        errors.username = 'Campo obrigatório'

    if (!values.password)
        errors.password = 'Campo obrigatório'
    else if (values.password.length < 6)
        errors.password = 'A senha possui seis caracteres ou mais'

    return errors
}

export default validateAuthenticationInfo