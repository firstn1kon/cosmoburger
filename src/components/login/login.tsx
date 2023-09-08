import { useEffect, FormEvent, useState, useRef } from "react"
import { Link } from "react-router-dom"
import { getIsLoadingUser, getIsErrorUser} from '../../services/slices/selectors'
import { loginUser, resetError} from "../../services/slices/user-slice"
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks"
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components"
import Error from "../error/error"
import Spinner from "../spinner/spinner"
import useValidate from "../../hooks/use-validate"
import styles from "./login.module.css"

const Login = () => {

    const [isShow, setShow] = useState<boolean>(false);
    const passwordRef = useRef<HTMLInputElement>(null);

    const {onChange, errors, disabled, value} = useValidate({
        inputValues: {email: "", password: ""},
        values: ['email', 'password']
    })
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(getIsLoadingUser)
    const isError = useAppSelector(getIsErrorUser)

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(loginUser(value))
    }

    const onIconClick = () => {
        setShow(!isShow)
        if(passwordRef.current) passwordRef.current.focus()
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
            <Input
                onChange={onChange}
                value={value.email}
                placeholder={"e-mail"}
                name={'email'}
                extraClass="mt-6"
                error={errors.email.error}
                errorText={errors.email.errorText}
            />
            <Input
                onChange={onChange}
                value={value.password}
                placeholder={"пароль"}
                type={isShow ? "text" : "password"}
                name={'password'}
                extraClass="mt-6"
                icon={isShow ? "HideIcon" : "ShowIcon"}
                onIconClick={onIconClick}
                error={errors.password.error}
                errorText={errors.password.errorText}
                ref={passwordRef}
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