import { useEffect, FormEvent, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { registerUser, resetError } from '../../services/slices/user-slice'
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks'
import { getIsLoadingUser, getIsErrorUser } from '../../services/slices/selectors'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import useValidate from '../../hooks/use-validate'
import Error from '../error/error'
import Spinner from '../spinner/spinner'
import styles from './register.module.css'

const Register = () => {

    const [isShow, setShow] = useState<boolean>(false);
    const passwordRef = useRef<HTMLInputElement>(null);

    const {onChange, errors, disabled, value} = useValidate({
        inputValues: {name: '', email: '', password: ''}, 
        values: ['email', 'password', 'name']
    })

    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(getIsLoadingUser)
    const isError = useAppSelector(getIsErrorUser)

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(registerUser(value))
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
            <Button disabled={isLoading || disabled} htmlType="submit" type="primary" size="medium" extraClass="mt-6">
                {statusButton}
            </Button>
            <p className='mt-20'>Уже зарегистрированы? <Link to="/login" className={styles.link}>Войти</Link></p>
        </form>
    )
}

export default Register