import { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateUser } from "../../../services/slices/user-slice";
import { getUserData } from "../../../services/slices/selectors";
import useValidate from "../../../hooks/use-validate";

import { EmailInput, Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"

import styles from "../profile.module.css"

const EditForm = () => {
    const dispatch = useDispatch();
    const {name, email} = useSelector(getUserData);
    const [isVisible, setIsVisible] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true)
    const nameRef = useRef(null);
    const {onChange, errors, reset, setValue, value} = useValidate({values: ['email', 'name']})

    const handleChange = e => {
        onChange(e)
        setIsVisible(true)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser(value))
        setIsVisible(false)
    }

    const onReset = (e) => {
        e.preventDefault();
        setValue({name, email})
        setIsVisible(false)
        reset()
    }
    const onBlur = (e) => {
        e.preventDefault();
        setIsDisabled(true)
    }

    const onIconClick = (e) => {
        e.preventDefault();
        setIsDisabled(false)
        nameRef.current.removeAttribute("disabled", "disabled")
        nameRef.current.focus()
    }

    useEffect(()=> {
        setValue({name, email})
    },[name, email, setValue])

    const disabled = errors.name.error || errors.email.error || errors.password.error

    return (
        <form className={styles.edit} onSubmit={onSubmit} onReset={onReset}>
            <Input
                type={'text'}
                placeholder={'имя'}
                onChange={handleChange}
                value={value.name ?? ""}
                name={'name'}
                error={errors.name.error}
                errorText={errors.name.errorText}
                size={'default'}
                extraClass="mb-6"
                icon="EditIcon"
                onIconClick={onIconClick}
                onBlur={onBlur}
                ref={nameRef}
                disabled={isDisabled}
            />
            <EmailInput
                onChange={handleChange}
                value={value.email ?? ""}
                name={'email'}
                placeholder="Логин"
                isIcon={true}
                extraClass="mb-6"
                error={errors.email.error}
                errorText={errors.email.errorText}
            />
            <PasswordInput
                onChange={handleChange}
                value={value.password ?? ""}
                name={'password'}
                extraClass="mt-6"
                icon="EditIcon"
                error={errors.password.error}
                errorText={errors.password.errorText}
            />
            {isVisible && 
                <div className={`${styles.buttons} mt-7`}>
                    <Button disabled={disabled} htmlType="submit" type="primary" size="large" extraClass={styles.button}>
                        Сохранить
                    </Button>
                    <Button htmlType="reset" type="primary" size="large" extraClass={styles.button}>
                        Отмена
                    </Button>
                </div>
            }
        </form>        
    )
}

export default EditForm