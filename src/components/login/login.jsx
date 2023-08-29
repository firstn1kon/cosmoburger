import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getIsLoadingUser, getIsErrorUser} from '../../services/slices/selectors'
import { loginUser, resetError} from "../../services/slices/user-slice"
import useValidate from "../../hooks/use-validate"

import { EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import Error from "../error/error"
import Spinner from "../spinner/spinner"

import styles from "./login.module.css"

const Login = () => {
    
    const [value, setValue] = useState({
        email: '',
        password: '',
    })

    const {onChange, errors, disabled} = useValidate({setValue, values: ['email', 'password']})
    const dispatch = useDispatch();
    const isLoading = useSelector(getIsLoadingUser)
    const isError = useSelector(getIsErrorUser)

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(value))
    }

    useEffect(()=> {
        return () => {
            dispatch(resetError())
        }
    // eslint-disable-next-line
    },[])

    const statusButton = isLoading ? <Spinner modal={false} loadText='Входим'/> : 'Войти'

    return (
        <form className={styles.wrapper} onSubmit={onSubmit}>
            <h2 className="text text_type_main-medium">Вход</h2>
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
            <Button  disabled={isLoading || disabled} htmlType="submit" type="primary" size="medium" extraClass="mt-6">
                {statusButton}
            </Button>
            <p className="mt-20">Вы — новый пользователь? <Link to="/register" className={styles.link}>Зарегистрироваться</Link></p>
            <p className="mt-4">Забыли пароль? <Link to="/forgot-password" className={styles.link}>Восстановить пароль</Link></p>
        </form>
    )
}

export default Login