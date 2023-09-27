import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SliceActions } from "../../utils/types/common.types";
import { IFeedWsResponse, TWsActions } from "../../utils/types/websocket.types";

interface IProfileState {
    data: IFeedWsResponse
    error: string | null,
    status: string,
    url: string
}

export const initialState: IProfileState = {
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

const profileSlice = createSlice({
    name: 'profile',
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

const {actions, reducer} = profileSlice;

export default reducer;

export const {
    initWS,
    closeWS,
    openWS,
    errorWS,
    messageWS,
    handleClose
} = actions;

export const profileWS: TWsActions = {
    wsInit: "profile/initWS",
    wsOffline: "profile/closeWS",
    onOpen: "profile/openWS",
    onError: "profile/errorWS",
    onMessage: "profile/messageWS",
    onClose: "profile/handleClose"
}

export type TProfileActions = SliceActions<typeof profileSlice.actions>;