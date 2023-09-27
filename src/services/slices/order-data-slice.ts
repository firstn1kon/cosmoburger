import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SliceActions, IBaseOrderInModal } from "../../utils/types/common.types";
import { getOrderData } from "../../utils/api";


interface IOrderDataState {
    orders: IBaseOrderInModal[], 
    isLoading: boolean,
    isError: boolean | undefined | string,
}

export const initialState: IOrderDataState = {
    orders: [],
    isLoading: true,
    isError: false,
}

const orderDataSlice = createSlice({
    name: 'orderData',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(orderDataFetch.pending, state => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(orderDataFetch.fulfilled, (state, action)=> {
                state.isLoading = false;
                action.payload.length === 1 ? state.orders = action.payload : state.orders = [];
            })
            .addCase(orderDataFetch.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message
            })
            .addDefaultCase(()=> {})
})

const {reducer} = orderDataSlice;

export default reducer;

// AsyncThunks
export const orderDataFetch = createAsyncThunk(
    'orderData/fetchOrder',
    getOrderData
)

export type TOrderDataStateActions = SliceActions<typeof orderDataSlice.actions>;