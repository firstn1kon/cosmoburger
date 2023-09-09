import { useState } from "react";
import { regexEmail } from "../utils/utils";

interface IUseValidate<T> {
    inputValues: T,
    values: string[],
}

interface IErrors {
    [key: string]: {
        error: boolean, 
        errorText: string, 
        disabled: boolean
    }
}

const useValidate = <T>({inputValues, values}: IUseValidate<T>) => {

    const [value, setValue] = useState<typeof inputValues>(inputValues);
    const [errors, setErrors] = useState<IErrors>({
        email: {
            error: false,
            errorText: 'формат email@email.ru',
            disabled: true,
        },
        password: {
            error: false,
            errorText: 'Минимум 8 символов',
            disabled: true
        },
        name: {
            error: false,
            errorText: 'Минимум 2 символа',
            disabled: true
        },
        token: {
            error: false,
            errorText: 'Формат xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
            disabled: true
        }
    })

    const reset = () => {
        const reset = {...errors}
        for (const prop in reset) {
        reset[prop].error = false
          }
        setErrors(reset)
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const field = e.target.name
        setValue(inputs => ({...inputs, [field]: value}))

        switch (field) {
            case 'email':
                regexEmail.test(value) 
                    ? setErrors(state => ({...state, email: {...state.email, error: false, disabled: false}}))
                    : setErrors(state => ({...state, email: {...state.email, error: true, disabled: true}}))
                break;
            case 'password':
                value.length < 8 
                    ? setErrors(state => ({...state, password: {...state.password, error: true, disabled: true}})) 
                    : setErrors(state => ({...state, password: {...state.password, error: false, disabled: false}}))
                break;
            case 'name':
                value.length < 2 
                ? setErrors(state => ({...state, name: {...state.name, error: true, disabled: true}})) 
                : setErrors(state => ({...state, name: {...state.name, error: false, disabled: false}}))
                break;
            case 'token':
                value.length !== 36 
                ? setErrors(state => ({...state, token: {...state.token, error: true, disabled: true}})) 
                : setErrors(state => ({...state, token: {...state.token, error: false, disabled: false}}))
                break;
            default: setErrors(state => ({...state}))
        };
    }

    const filterByKeys = () => {
        const copy = {...errors}
        for (const prop in copy) {
        if(!values.some(value => value === prop)) delete copy[prop]
          }
          return copy
    }

    const disabled = !Object.values(filterByKeys()).every(error => error.disabled === false)

    return {errors, onChange, disabled, reset, value, setValue}

}

export default useValidate
