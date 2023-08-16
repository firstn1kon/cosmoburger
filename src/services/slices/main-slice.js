import { createSlice, createAsyncThunk, nanoid, createSelector } from "@reduxjs/toolkit";
import { getAllIngredients } from "../../utils/api";

const initialState = {
    ingredients: [],
    isLoading: false,
    isError: false,
    constructor: {
        bun: false,
        saucesAndMains: [],
        helper: true
    },
    viewIngredient: null,
    isIngredientModalOpen: false,
    currentTab: "bun"
}

export const ingredientsFetch = createAsyncThunk(
    'main/ingredientsFetch',
    async () => {
        return await getAllIngredients()
    }
)

const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        addToConstructor: {
            reducer: (state, action) => {
                if (action.payload.type === 'bun') {
                    state.constructor.bun = action.payload;
                }
                else {
                    state.constructor.saucesAndMains.unshift(action.payload)
                }
                state.constructor.helper = false;
            },
            prepare: (payload) => ({payload: {...payload, _uid: nanoid()}})
          },
        deleteFromConstructor: (state, action) => {
            const index = state.constructor.saucesAndMains.findIndex(item => item._uid === action.payload)
            if (index !== -1) state.constructor.saucesAndMains.splice(index, 1)
        },
        sortInConstrucor: (state, action) => {
            let temp = state.constructor.saucesAndMains[action.payload.hoverIndex]
            state.constructor.saucesAndMains[action.payload.hoverIndex] = state.constructor.saucesAndMains[action.payload.dragIndex];
            state.constructor.saucesAndMains[action.payload.dragIndex] = temp
        },
        resetConstructor: state => {state.constructor = initialState.constructor},
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

export const dataViewingIngredient = createSelector(
    (state) => state.main.ingredients,
    (state) => state.main.viewIngredient,
    (ingredients, id) => ingredients.find(ingredient => ingredient._id === id)
)


const {actions, reducer} = mainSlice;

export default reducer;




export const {
    addToConstructor,
    deleteFromConstructor,
    sortInConstrucor,
    resetConstructor,
    openIngredientModal,
    closeIngredientModal,
    setViewIngredient,
    setCurrentTab

} = actions;