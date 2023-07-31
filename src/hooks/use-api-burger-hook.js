import { useHttp } from "./use-http-hook"

const useApiBurger = () => {
    const {isError, isLoading, request} = useHttp();
    
    const _apiBase = 'https://norma.nomoreparties.space'

    const getAllIngredients = async () => {
        const res = await request(`${_apiBase}/api/ingredients`);
        return res.data
    }
    return {isError, isLoading, getAllIngredients}
}

export default useApiBurger