import { useState, useRef, useEffect, FormEvent, ChangeEvent, FocusEvent, MouseEvent } from "react"
import { useAppDispatch, useAppSelector } from "../../../hooks/store-hooks";
import { updateUser } from "../../../services/slices/user-slice";
import { getUserData } from "../../../services/slices/selectors";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import useValidate from "../../../hooks/use-validate";
import { IBasicUserPostData } from "../../../utils/types/api.types";
import styles from "../profile.module.css"

const EditForm = () => {
    const dispatch = useAppDispatch();
    const {name, email} = useAppSelector(getUserData);
    const [isVisible, setIsVisible] = useState(false)
    const [disable, setDisable] = useState({
        name: true,
        email: true,
        password: true
    })
    const nameRef = useRef<HTMLInputElement[]>([]);
    const {onChange, errors, reset, setValue, value} = useValidate<Partial<IBasicUserPostData>>({
        inputValues: {}, 
        values: ['email', 'name', "password"]
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e)
        setIsVisible(true)
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(updateUser(value))
        setIsVisible(false)
    }

    const onReset = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setValue({name, email})
        setIsVisible(false)
        reset()
    }
    const onBlur = (e: FocusEvent<HTMLInputElement>) => {
        e.preventDefault()
        const name = e.target.name
        setDisable(state => ({...state, [name]: true}))
    }

    const onIconClick = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        const target = e.target as HTMLDivElement
        const chooseInput = target.closest("div")?.previousSibling as HTMLInputElement
        if(nameRef.current) {
            nameRef.current.forEach(input => {
                if(input.name === chooseInput.name) {
                    input.removeAttribute("disabled")
                    input.focus()
                    setDisable(state => ({...state, [input.name]: false}))
                }
            })
        }
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
                ref={ref => nameRef.current[0] = ref as HTMLInputElement}
                disabled={disable.name}
            />
            <Input
                onChange={handleChange}
                value={value.email ?? ""}
                name={'email'}
                placeholder="Логин"
                icon="EditIcon"
                extraClass="mb-6"
                onIconClick={onIconClick}
                error={errors.email.error}
                errorText={errors.email.errorText}
                onBlur={onBlur}
                ref={ref => nameRef.current[1] = ref as HTMLInputElement}
                disabled={disable.email}
            />
            <Input
                onChange={handleChange}
                value={value.password ?? ""}
                name={'password'}
                placeholder="Пароль"
                extraClass="mt-6"
                icon="EditIcon"
                onIconClick={onIconClick}
                error={errors.password.error}
                errorText={errors.password.errorText}
                onBlur={onBlur}
                ref={ref => nameRef.current[2] = ref as HTMLInputElement}
                disabled={disable.password}
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