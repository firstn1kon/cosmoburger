import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SliceActions } from "../../utils/types/common.types";
import { IFeedWsResponse } from "../../utils/types/websocket.types";

interface IProfileState {
    data: IFeedWsResponse
    error: any,
    status: string,
    url: string
}

const initialState: IProfileState = {
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
        },
        closeWS: state => {state.status = "closed"},
        openWS: state => {state.status = "online"},
        errorWS: (state, action)=> {
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
    closeWS

} = actions;

export type TProfileActions = SliceActions<typeof profileSlice.actions>;