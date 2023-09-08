import { setTokens, getAccessToken, getRefreshToken, removeAllTokens } from "./utils";
import { IBasicIngredient } from "./types";

const _apiBase = 'https://norma.nomoreparties.space/api';
const _loginPage = '/login'

const refreshToken = async () => {
    const json: any = JSON.stringify({token: getRefreshToken()})
        const res = await request<any | string>(`${_apiBase}/auth/token`, 'POST', json);
        if (res.success) {
            setTokens(res)
        }
        return res
}

interface IFetchIngredients {
    success: true | false,
    data: IBasicIngredient[],
}

export interface IRequestWithTokens {
    success: IFetchIngredients['success'],
    accessToken: string,
    refreshToken: string,
    user: {
        email: string,
        name: string,
    }
}

export interface IBasicUserPostData {
    email: string,
    password: string,
    name: string
}

interface RequestLogout {
    success: IFetchIngredients['success'],
    message: string
  }


async function request <T> (url: any, method = 'GET', body = null, headers: any = {'Content-Type': 'application/json'}): Promise<T> {
    try {
        const response = await fetch(url, {method, body, headers});

        if (!response.ok) {
            if (response.status === 404) return Promise.reject(new Error(`${url}, status: ${response.status}`))
            const data = await response.json()
            return Promise.reject(data.message)
        }

        const data = await response.json();
        return data;
        
    } catch(e) {
        throw e;
    }
};

const requestWithRefresh = async (
        url: any, 
        method = 'GET', 
        body = null, 
        headers: {[key: string]: string} = {'Content-Type': 'application/json', 'Authorization': getAccessToken() as string
    }) => {
    try {
        const response = await fetch(url, {method, body, headers, mode: 'cors', cache: 'no-cache', credentials: 'same-origin',});
        if (!response.ok) {
            if (response.status === 404) return Promise.reject(new Error(`${url}, status: ${response.status}`))
            const data = await response.json()
            if(data.message === "jwt expired" || data.message === 'invalid token') {
                return refreshToken().then(() => request(url, method, body, {
                    'Content-Type': 'application/json',
                    'Authorization': getAccessToken() as string
                })).catch(() =>  {removeAllTokens(); window.location.replace(_loginPage)})
            } 
            return Promise.reject(data.message)
        }

        const data = await response.json();
        return data;
        
    } catch(e) {
        throw e;
    }
};


export const getAllIngredients = async () => {
    const res = await request<IFetchIngredients>(`${_apiBase}/ingredients`);
    return res.data
};

export const postOrder = async (order: {ingredients: string[]}) => {
    const json: any = JSON.stringify(order)
    const res = await requestWithRefresh(`${_apiBase}/orders`, 'POST', json);
    return res
};

export const postRegisterUser = async (user: IBasicUserPostData) => {
    const json: any = JSON.stringify(user)
    const res = await request<IRequestWithTokens>(`${_apiBase}/auth/register`, 'POST', json);
    if (res.success) {
        setTokens(res)
    }
    return res.user
}
// Pick<IBasicUserPostData, "email" | "password">
export const postLoginUser = async (user: any) => {
    const json: any = JSON.stringify(user)
    const res = await request<IRequestWithTokens>(`${_apiBase}/auth/login`, 'POST', json);
    if (res.success) {
        setTokens(res)
    }
    return res.user
}
// Pick<IBasicUserPostData, "email">
export const postFogotPassword = async (email: any) => {
    const json: any = JSON.stringify(email)
    const res = await request(`${_apiBase}/password-reset`, 'POST', json);
    return res
}

export const postResetPassword = async (data: any) => {
    const json: any = JSON.stringify(data)
    const res = await request<any>(`${_apiBase}/password-reset/reset`, 'POST', json);
    return res
}

export const getUser = async () => {
        const res = await requestWithRefresh(`${_apiBase}/auth/user`, 'GET');
        return res.user
};

export const patchUser = async (user: any) => {
    const json: any = JSON.stringify(user)
    const res = await requestWithRefresh(`${_apiBase}/auth/user`, 'PATCH', json);
    return res.user
}

export const postLogoutUser = async () => {
    const json: any = JSON.stringify({token: getRefreshToken()})
    const res = await request<RequestLogout>(`${_apiBase}/auth/logout`, 'POST', json);
    if (res.success) {
        removeAllTokens()
    }
    return res
}

