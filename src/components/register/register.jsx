import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { registerUser, resetError } from '../../services/slices/user-slice'
import { useDispatch, useSelector } from 'react-redux'
import { getIsLoadingUser, getIsErrorUser } from '../../services/slices/selectors'
import useValidate from '../../hooks/use-validate'

import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import Error from '../error/error'
import Spinner from '../spinner/spinner'

import styles from './register.module.css'

const Register = () => {

    const {onChange, errors, disabled, value} = useValidate({
        inputValues: {name: '', email: '', password: ''}, 
        values: ['email', 'password', 'name']
    })

    const dispatch = useDispatch();
    const isLoading = useSelector(getIsLoadingUser)
    const isError = useSelector(getIsErrorUser)

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(value))
    }

    useEffect(()=> {
        return () => {
            dispatch(resetError())
        }
    // eslint-disable-next-line
    },[])

    const statusButton = isLoading ? <Spinner modal={false} loadText='Регистрируем'/> : 'Зарегистрироваться'

    return (
        <form className={styles.wrapper} onSubmit={onSubmit}>
            <h2 className="text text_type_main-medium">Регистрация</h2>
            <Input
            type={'text'}
            placeholder={'имя'}
            onChange={onChange}
            value={value.name}
            name={'name'}
            error={errors.name.error}
            errorText={errors.name.errorText}
            size={'default'}
            extraClass="mt-6"
            />
            <EmailInput
            onChange={onChange}
            value={value.email}
            name={'email'}
            isIcon={false}
            extraClass="mt-6"
            error={errors.email.error}
            errorText={errors.email.errorText}
            />
            <PasswordInput
            onChange={onChange}
            value={value.password}
            name={'password'}
            extraClass="mt-6"
            error={errors.password.error}
            errorText={errors.password.errorText}
            />
            {isError && <Error err={isError} inline={true}/>}
            <Button disabled={isLoading || disabled} htmlType="submit" type="primary" size="medium" extraClass="mt-6">
                {statusButton}
            </Button>
            <p className='mt-20'>Уже зарегистрированы? <Link to="/login" className={styles.link}>Войти</Link></p>
        </form>
    )
}

export default Register