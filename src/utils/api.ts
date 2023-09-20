import { setTokens, getAccessToken, getRefreshToken, removeAllTokens } from "./utils";
import { IResponseRefreshToken, IRequest, IResponseIngredients, IBasicResponseUser, 
         IBasicUserPostData, IResponseWithTokens,TLoginPostData,TFogotPostData,
         TResetPostData,TPatchDataUser,IResponsePostOrder,TResponseUserData,
         IOrderInModalResponse
 } from "./types/api.types";

export const _wsFeed = 'wss://norma.nomoreparties.space/orders/all'
export const _wsProfile = 'wss://norma.nomoreparties.space/orders?token='
export const _loginPage = '/login'
const _apiBase = 'https://norma.nomoreparties.space/api';

export const refreshToken = async () : Promise<IResponseRefreshToken>=>  {
    const json= JSON.stringify({token: getRefreshToken()})
        const res = await request<IResponseRefreshToken>(`${_apiBase}/auth/token`, 'POST', json);
        if (res.success) {
            setTokens(res)
        }
        return res
}

const request = async  <T> (
    url: IRequest['url'], 
    method : IRequest['method'] = 'GET', 
    body : IRequest['body'] = undefined, 
    headers: IRequest['headers'] = {'Content-Type': 'application/json'})
    : Promise<T> => {
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

const requestWithRefresh = async <T> (
        url: IRequest['url'], 
        method: IRequest['method']  = 'GET', 
        body: IRequest['body'] = undefined, 
        headers: IRequest['headers'] = {'Content-Type': 'application/json', 'Authorization': getAccessToken() as string | undefined
    })  : Promise<T | void> => {
    try {
        const response = await fetch(url, {method, body, headers, mode: 'cors', cache: 'no-cache', credentials: 'same-origin',});
        if (!response.ok) {
            if (response.status === 404) return Promise.reject(new Error(`${url}, status: ${response.status}`))
            const data = await response.json()
            if(data.message === "jwt expired" || data.message === 'invalid token') {
                 return refreshToken().then(() => request<T>(url, method, body, {
                    'Content-Type': 'application/json',
                    'Authorization': getAccessToken() as string | undefined
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
    const res = await request<IResponseIngredients>(`${_apiBase}/ingredients`);
    return res.data
};

export const postOrder = async (order: {ingredients: string[]}) => {
    const json = JSON.stringify(order)
    const res = await requestWithRefresh<IResponsePostOrder>(`${_apiBase}/orders`, 'POST', json) as IResponsePostOrder
    return res
};

export const postRegisterUser = async (user: IBasicUserPostData) => {
    const json= JSON.stringify(user)
    const res = await request<IResponseWithTokens>(`${_apiBase}/auth/register`, 'POST', json);
    if (res.success) {
        setTokens(res)
    }
    return res.user
}

export const postLoginUser = async (user: TLoginPostData) => {
    const json = JSON.stringify(user)
    const res = await request<IResponseWithTokens>(`${_apiBase}/auth/login`, 'POST', json);
    if (res.success) {
        setTokens(res)
    }
    return res.user
}

export const postFogotPassword = async (email: TFogotPostData) => {
    const json= JSON.stringify(email)
    const res = await request<IBasicResponseUser>(`${_apiBase}/password-reset`, 'POST', json);
    return res
}

export const postResetPassword = async (data: TResetPostData) => {
    const json= JSON.stringify(data)
    const res = await request<IBasicResponseUser>(`${_apiBase}/password-reset/reset`, 'POST', json);
    return res
}

export const getUser = async () => {
        const res = await requestWithRefresh<TResponseUserData>(`${_apiBase}/auth/user`, 'GET') as TResponseUserData
        return res.user 
};

export const patchUser = async (user: TPatchDataUser) => {
    const json= JSON.stringify(user)
    const res = await requestWithRefresh<TResponseUserData>(`${_apiBase}/auth/user`, 'PATCH', json) as TResponseUserData
    return res.user
}

export const postLogoutUser = async () => {
    const json= JSON.stringify({token: getRefreshToken()})
    const res = await request<IBasicResponseUser>(`${_apiBase}/auth/logout`, 'POST', json);
    if (res.success) {
        removeAllTokens()
    }
    return res
}

export const getOrderData = async (number: string | undefined) => {
    const res = await request<IOrderInModalResponse>(`${_apiBase}/orders/${number}`, 'GET');
    return res.orders
}