import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postRegisterUser, postLoginUser, postFogotPassword, postResetPassword, getUser, patchUser, postLogoutUser } from "../../utils/api";
import { checkRefreshOrAccessTokens } from "../../utils/utils";

const initialState = {
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
        resetError: (state) => {state.isError= false}
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
            .addCase(logoutUser.fulfilled, ()=>  ({...initialState, isCkechedAuth: true}))
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
    async (user) => {
        return await postRegisterUser(user)
    }
)

export const loginUser = createAsyncThunk(
    'user/login',
    async (user) => {
        return await postLoginUser(user)
    }
)

export const fogotPassword = createAsyncThunk(
    'user/forgot-password',
    async (email) => {
        return await postFogotPassword(email)
    }
)

export const resetPassword = createAsyncThunk(
    'user/reset-password',
    async (data) => {
        return await postResetPassword(data)
    }
)

export const fetchUser = createAsyncThunk(
    'user/get-user',
    async (thunkAPI) => {
        if(checkRefreshOrAccessTokens()) {
            return await getUser()
        }
        else {
            thunkAPI.dispatch(checkAuth())
        }
    }
)

export const updateUser = createAsyncThunk(
    'user/update-user',
    async (user) => {
        return await patchUser(user)
    }
)

export const logoutUser = createAsyncThunk(
    'user/logout-user',
    async () => {
        return await postLogoutUser()
    }
)