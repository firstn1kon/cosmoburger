//Tokens utils
import { IResponseRefreshToken } from "./types/api.types"

export const setTokens = (res: IResponseRefreshToken) => {
    localStorage.setItem('accessToken', res.accessToken)
    localStorage.setItem('refreshToken', res.refreshToken)
}

export const getAccessToken = () =>  localStorage.getItem('accessToken')
export const getRefreshToken = () => localStorage.getItem('refreshToken')

export const checkRefreshOrAccessTokens = () => {
    if (localStorage.getItem('accessToken') || localStorage.getItem('refreshToken')) {
        return true
    }
    else {
        return false
    }
}
export const removeAllTokens = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
}

export const getAccessTokenWs = () => localStorage.getItem('accessToken')?.replace("Bearer ", "")

//RegEx utils
export const regexProfileUrl = new RegExp(/\/profile/);
export const regexEmail = new RegExp(/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/);