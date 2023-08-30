import { useCallback, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getIsLoadingUser, getIsErrorUser } from '../../services/slices/selectors'
import { fogotPassword, resetError } from "../../services/slices/user-slice"
import useValidate from "../../hooks/use-validate"

import Error from "../error/error"
import Spinner from "../spinner/spinner"
import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"

import styles from "./forgot-password.module.css"

const ForgotPassword = () => {

    const {onChange, errors, disabled, value} = useValidate({inputValues: {email: ''} , values: ['email']})
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const isLoading = useSelector(getIsLoadingUser)
    const isError = useSelector(getIsErrorUser)

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(fogotPassword(value)).then(()=> navigate('/reset-password'))
    }

    const tryAgain = useCallback(() =>  {
        dispatch(resetError())
    },[dispatch])

    useEffect(()=> {
        return () => {
            dispatch(resetError())
        }
    // eslint-disable-next-line
    },[])

    const statusButton = isLoading ? <Spinner modal={false} loadText='Высылаем код'/> : 'Восстановить'

    return (
        <form className={styles.wrapper} onSubmit={onSubmit}>
            <h2 className="text text_type_main-medium">Восстановление пароля</h2>
            <EmailInput
            onChange={onChange}
            value={value.email}
            name={'email'}
            isIcon={false}
            extraClass="mt-6"
            error={errors.email.error}
            errorText={errors.email.errorText}
            />
            <Button disabled={isLoading || disabled} htmlType="submit" type="primary" size="medium" extraClass="mt-6">
                {statusButton}
            </Button>
            <p className="mt-20">Вспомнили пароль? <Link to="/login" className={styles.link}>Войти</Link></p>
            {isError && <Error err={isError} tryAgain={tryAgain}/>}
        </form>
    )
}

export default ForgotPassword