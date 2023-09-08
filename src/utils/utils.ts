//Tokens utils

export interface ISetTokens {
    success: boolean,
    accessToken: string,
    refreshToken: string,
    user: {
        email: string,
        name: string,
    }
}

export const setTokens = (res: ISetTokens) => {
    localStorage.setItem('accessToken', res.accessToken)
    localStorage.setItem('refreshToken', res.refreshToken)
}

export const getAccessToken = () => localStorage.getItem('accessToken')
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

//RegEx utils
export const regexProfileUrl = new RegExp(/\/profile/);
export const regexEmail = new RegExp(/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/);