import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllIngredients } from "../../utils/api";

const initialState = {
    ingredients: [],
    isLoading: false,
    isError: false,
    viewIngredient: null,
    isIngredientModalOpen: false,
    currentTab: "bun"
}

export const ingredientsFetch = createAsyncThunk(
    'ingredients/ingredientsFetch',
    async () => {
        return await getAllIngredients()
    }
)

const mainSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        openIngredientModal: state => {state.isIngredientModalOpen = true;},
        closeIngredientModal: state => {
            state.isIngredientModalOpen = false
            state.viewIngredient = null
        },
        setViewIngredient: (state, action) => {state.viewIngredient = action.payload},
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
    openIngredientModal,
    closeIngredientModal,
    setViewIngredient,
    setCurrentTab
} = actions;