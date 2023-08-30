import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllIngredients } from "../../utils/api";

const initialState = {
    ingredients: [],
    isLoading: false,
    isError: false,
    currentTab: "bun"
}

const mainSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        setCurrentTab: (state, action) => {state.currentTab = action.payload}
    },
    extraReducers: builder =>
        builder
            .addCase(ingredientsFetch.pending, state => {state.isLoading = true})
            .addCase(ingredientsFetch.fulfilled, (state, action)=> {
                state.isLoading = false;
                state.ingredients = action.payload;
            })
            .addCase(ingredientsFetch.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message
            })
            .addDefaultCase(()=> {})
})

const {actions, reducer} = mainSlice;

export default reducer;

export const {
    setCurrentTab
} = actions;

// AsyncThunks
export const ingredientsFetch = createAsyncThunk(
    'ingredients/ingredientsFetch',
    getAllIngredients
)