import { TOrderActions } from "../../services/slices/order-slice"
import { TIngredientsActions } from "../../services/slices/ingredients-slice"
import { TUserActions } from "../../services/slices/user-slice"
import { TKitActions } from "../../services/slices/constructor-slice"
import { TFeedActions } from "../../services/slices/feed-slice"
import { TProfileActions } from "../../services/slices/profile-slice"
import { IBaseOrderWs } from "./common.types"

type TActions = 'wsInit' | "wsOffline" | "onOpen" | "onError" | "onMessage" | "onClose" 

export type TWsActions = {
    [key in TActions]: string
}

export interface IFeedWsResponse{
    success: boolean;
    orders: IBaseOrderWs[];
    total: number;
    totalToday: number;
}

export type TAllAppActions = TOrderActions | TIngredientsActions | TUserActions | TKitActions | TFeedActions | TProfileActions


