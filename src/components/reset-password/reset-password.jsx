import { useDispatch, useSelector } from "react-redux"
import { useCallback, useEffect } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { resetPassword, resetError } from "../../services/slices/user-slice"
import { getIsLoadingUser, getIsErrorUser, getTransfer } from '../../services/slices/selectors'
import useValidate from '../../hooks/use-validate'

import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import Error from '../error/error'
import Spinner from '../spinner/spinner'

import styles from "./reset-password.module.css"

const ResetPassword = () => {

    const {onChange, errors, disabled, value} = useValidate({
        inputValues: {password: "", token: ""},
        values: ['password', 'token']
    })

    const location = useLocation();
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const isLoading = useSelector(getIsLoadingUser)
    const isError = useSelector(getIsErrorUser)
    const transfer = useSelector(getTransfer)

    const tryAgain = useCallback(() =>  {
        dispatch(resetError())
    },[dispatch])

    useEffect(()=> {
        return () => {
            dispatch(resetError())
        }
    // eslint-disable-next-line
    },[])

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPassword(value))
            .unwrap()
            .then((res) => res.success ? navigate('/login') : null)
    }

    if (!transfer) {
        const { from } = location.state || { from: { pathname: "/" } };
        return <Navigate to={from} />;
    }

    const statusButton = isLoading ? <Spinner modal={false} loadText='Изменяем пароль'/> : 'Сохранить'

    return (
        <form className={styles.wrapper} onSubmit={onSubmit}>
            <h2 className="text text_type_main-medium">Восстановление пароля</h2>
            <PasswordInput
            onChange={onChange}
            value={value.password}
            name={'password'}
            extraClass="mt-6"
            placeholder={'Введите новый пароль'}
            error={errors.password.error}
            errorText={errors.password.errorText}
            />
            <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={onChange}
            value={value.token}
            name={'token'}
            error={errors.token.error}
            errorText={errors.token.errorText}
            size={'default'}
            extraClass="mt-6"
            />
            <Button disabled={isLoading || disabled} htmlType="submit" type="primary" size="medium" extraClass="mt-6">
               {statusButton}
            </Button>
            <p className="mt-20">Вспомнили пароль? <Link to="/login" className={styles.link}>Войти</Link></p>
            {isError && <Error err={isError} tryAgain={tryAgain}/>}
        </form>
    )
}

export default ResetPassword