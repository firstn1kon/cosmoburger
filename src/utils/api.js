import { setTokens, getAccessToken, getRefreshToken, removeAllTokens } from "./utils";

const _apiBase = 'https://norma.nomoreparties.space/api';
const _loginPage = '/login'

const refreshToken = async () => {
    const json = JSON.stringify({token: getRefreshToken()})
        const res = await request(`${_apiBase}/auth/token`, 'POST', json);
        if (res.success) {
            setTokens(res)
        }
        return res
}

const request = async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
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
        url, 
        method = 'GET', 
        body = null, 
        headers = {'Content-Type': 'application/json', Authorization: getAccessToken()
    }) => {
    try {
        const response = await fetch(url, {method, body, headers, mode: 'cors', cache: 'no-cache', credentials: 'same-origin',});
        if (!response.ok) {
            if (response.status === 404) return Promise.reject(new Error(`${url}, status: ${response.status}`))
            const data = await response.json()
            if(data.message === "jwt expired" || data.message === 'invalid token') {
                return refreshToken().then(() => request(url, method, body, {
                    'Content-Type': 'application/json',
                    Authorization: getAccessToken()
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
    const res = await request(`${_apiBase}/ingredients`);
    return res.data
};

export const postOrder = async (order) => {
    const json = JSON.stringify(order)
    const res = await request(`${_apiBase}/orders`, 'POST', json);
    return res
};

export const postRegisterUser = async (user) => {
    const json = JSON.stringify(user)
    const res = await request(`${_apiBase}/auth/register`, 'POST', json);
    if (res.success) {
        setTokens(res)
    }
    return res.user
}

export const postLoginUser = async (user) => {
    const json = JSON.stringify(user)
    const res = await request(`${_apiBase}/auth/login`, 'POST', json);
    if (res.success) {
        setTokens(res)
    }
    return res.user
}

export const postFogotPassword = async (email) => {
    const json = JSON.stringify(email)
    const res = await request(`${_apiBase}/password-reset`, 'POST', json);
    return res
}

export const postResetPassword = async (data) => {
    const json = JSON.stringify(data)
    const res = await request(`${_apiBase}/password-reset/reset`, 'POST', json);
    return res
}

export const getUser = async () => {
        const res = await requestWithRefresh(`${_apiBase}/auth/user`, 'GET');
        return res.user
};

export const patchUser = async (user) => {
    const json = JSON.stringify(user)
    const res = await requestWithRefresh(`${_apiBase}/auth/user`, 'PATCH', json);
    return res.user
}

export const postLogoutUser = async () => {
    const json = JSON.stringify({token: getRefreshToken()})
    const res = await request(`${_apiBase}/auth/logout`, 'POST', json);
    if (res.success) {
        removeAllTokens()
    }
    return res
}

