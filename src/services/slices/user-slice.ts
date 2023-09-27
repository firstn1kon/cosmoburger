import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postRegisterUser, postLoginUser, postFogotPassword, postResetPassword, getUser, patchUser, postLogoutUser } from "../../utils/api";
import { SliceActions } from "../../utils/types/common.types";

interface IUserState {
    user: {
        name: string,
        email: string,
    }
    isCkechedAuth: boolean,
    isLoading: boolean,
    isError: boolean | undefined | string,
    transfer: boolean 
}

export const initialState: IUserState = {
    user: {
        name: "",
        email: ""
    },
    isCkechedAuth: false,
    isLoading: false,
    isError: false,
    transfer: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetTransfer: state => {state.transfer = false;},
        checkAuth: state => {state.isCkechedAuth = true;},
        resetError: state => {state.isError= false}
    },
    extraReducers: builder =>
        builder 
            .addCase(registerUser.pending, state => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(registerUser.fulfilled, (state, action)=> {
                state.isLoading = false;
                state.user = action.payload;
                state.isCkechedAuth = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message
            })
            .addCase(loginUser.pending, state => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(loginUser.fulfilled, (state, action)=> {
                state.isLoading = false;
                state.user = action.payload;
                state.isCkechedAuth = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message
            })
            .addCase(fogotPassword.pending, state => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(fogotPassword.fulfilled, (state)=> {
                state.isLoading = false;
                state.transfer = true
            })
            .addCase(fogotPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message
            })
            .addCase(resetPassword.pending, state => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(resetPassword.fulfilled, (state)=> {
                state.isLoading = false;
                state.transfer = false
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message
            })
            .addCase(fetchUser.pending, state => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(fetchUser.fulfilled, (state, action)=> {
                state.isLoading = false;
                state.user = action.payload;
                state.isCkechedAuth = true;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isCkechedAuth = true;
                state.isError = action.error.message
            })
            .addCase(updateUser.pending, state => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(updateUser.fulfilled, (state, action)=> {
                state.isLoading = false;
                state.user = action.payload;
                state.isCkechedAuth = true;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message
            })
            .addCase(logoutUser.pending, state => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(logoutUser.fulfilled, () => ({...initialState, isCkechedAuth: true}))
            .addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message
            })
            .addDefaultCase(()=> {})
})


const {actions, reducer} = userSlice;

export default reducer;

export const {
    resetError,
    resetTransfer,
    checkAuth
} = actions;

// AsyncThunks
export const registerUser = createAsyncThunk(
    'user/register',
    postRegisterUser
)

export const loginUser = createAsyncThunk(
    'user/login',
    postLoginUser
)

export const fogotPassword = createAsyncThunk(
    'user/forgot-password',
    postFogotPassword
)

export const resetPassword = createAsyncThunk(
    'user/reset-password',
    postResetPassword
)

export const fetchUser = createAsyncThunk(
    'user/get-user',
    getUser
)

export const updateUser = createAsyncThunk(
    'user/update-user',
    patchUser
)

export const logoutUser = createAsyncThunk(
    'user/logout-user',
    postLogoutUser
)

export type TUserActions = SliceActions<typeof userSlice.actions>;