import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postOrder } from "../../utils/api";
import { SliceActions } from "../../utils/types/common.types";

interface IOrderState {
    data: {
        success: boolean,
        name: string,
        order: {
            number: number | null
        }

    }
    isOrderModalOpen: boolean,
    isLoading: boolean,
    isError: boolean | undefined | string 
}

const initialState: IOrderState = {
    data: {
        success: false,
        name: "",
        order: {
            number: null
        }
    },
    isOrderModalOpen: false,
    isLoading: false,
    isError: false,
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        openOrderModal: state => {state.isOrderModalOpen = true;},
        closeOrderModal: state => {
            state.isOrderModalOpen = false
            state.data.order.number = null
        },
        resetError: () => ({...initialState})
    },
    extraReducers: builder =>
        builder
            .addCase(sendOrder.pending, state => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(sendOrder.fulfilled, (state, action)=> {
                state.isLoading = false;
                state.data = action.payload;
                state.isOrderModalOpen = true;
            })
            .addCase(sendOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message
            })
            .addDefaultCase(()=> {})
})


const {actions, reducer} = orderSlice;

export default reducer;

export const {
    openOrderModal,
    closeOrderModal,
    resetError
} = actions;

// AsyncThunks
export const sendOrder = createAsyncThunk(
    'order/sendOrder',
    postOrder
)

export type TOrderActions = SliceActions<typeof orderSlice.actions>;