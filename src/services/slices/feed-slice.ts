import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SliceActions } from "../../utils/types/common.types";
import { IFeedWsResponse, TWsActions } from "../../utils/types/websocket.types";

interface IFeedState {
    data: IFeedWsResponse
    error: any,
    status: string,
    url: string
}

const initialState: IFeedState = {
    data: {
        success: false,
        orders: [],
        total: 0,
        totalToday: 0,
    },
    error: null,
    status: "",
    url: "",
}

const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        initWS: (state, action: PayloadAction<string>) => {
            state.status = "init";
            state.url = action.payload
            state.error = null
        },
        closeWS: state => {state.status = "closed"},
        openWS: state => {state.status = "online"},
        errorWS: (state, action: PayloadAction<string>)=> {
            state.status = "error";
            state.error = action.payload
        },
        messageWS: (state, action: PayloadAction<IFeedWsResponse>)=> {state.data = action.payload},
        handleClose: (state, action: PayloadAction<string>) => {state.status = action.payload}
    },

})


const {actions, reducer} = feedSlice;

export default reducer;

export const {
    initWS,
    closeWS

} = actions;

export const feedWS: TWsActions = {
    wsInit: "feed/initWS",
    wsOffline: "feed/closeWS",
    onOpen: "feed/openWS",
    onError: "feed/errorWS",
    onMessage: "feed/messageWS",
    onClose: "feed/handleClose"
}

export type TFeedActions = SliceActions<typeof feedSlice.actions>;