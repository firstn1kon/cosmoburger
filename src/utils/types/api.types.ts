import { IBasicIngredient } from "./common.types"

export interface IResponseIngredients {
    success: boolean,
    data: IBasicIngredient[],
}

export interface IResponseRefreshToken {
    success: IResponseIngredients['success'],
    accessToken: string,
    refreshToken: string
}

export interface IResponsePostOrder {
    success: IResponseIngredients['success'],
    name: string,
    order: {
        number: number
    },
}

export interface IResponseWithTokens extends IResponseRefreshToken{
    user: {
        email: string,
        name: string,
    }
}

export type TResponseUserData = Omit<IResponseWithTokens, "accessToken" | "refreshToken">

export interface IBasicResponseUser {
    success: IResponseIngredients['success'],
    message: string
}

export interface IBasicUserPostData {
    email: string,
    password: string,
    name: string,
    token?: string
}

export type TLoginPostData = Pick<IBasicUserPostData, "email" | "password">
export type TFogotPostData = Pick<IBasicUserPostData, "email">
export type TResetPostData = Required<Pick<IBasicUserPostData, "password" | "token">>
export type TPatchDataUser = Omit<Partial<IBasicUserPostData>, "token">


  
export interface IRequest  {
    url: string,
    method: "GET" | "POST" | "PATCH" | "DELETE" | "PUT"
    headers: {
      'Content-Type': string,
      'Authorization'?: string
    },
    body?: string
}
