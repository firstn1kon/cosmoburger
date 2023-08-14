import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
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
    viewIngredient: {},
    order: {},
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
                    state.constructor.helper = false;
                }
                else {
                    state.constructor.saucesAndMains.unshift(action.payload)
                    state.constructor.helper = false;
                }
            },
            prepare: (payload) => ({payload: {...payload, _uid: nanoid()}})
          },
        deleteFromConstructor: (state, action) => {
            const index = state.constructor.saucesAndMains.findIndex(item => item._uid === action.payload)
            if (index !== -1) state.constructor.saucesAndMains.splice(index, 1)
        },
        sortInConstrucor: (state, action) => {
            // const dragCard = state.constructor[action.payload.dragIndex];
            // state.constructor.splice(action.payload.dragIndex,0); 
            // state.constructor.splice(action.payload.hoverIndex,0, dragCard)
            let temp = state.constructor.saucesAndMains[action.payload.hoverIndex]
            state.constructor.saucesAndMains[action.payload.hoverIndex] = state.constructor.saucesAndMains[action.payload.dragIndex];
            state.constructor.saucesAndMains[action.payload.dragIndex] = temp
            // [state.constructor.saucesAndMains[action.payload.hoverIndex], state.constructor.saucesAndMains[action.payload.dragIndex]] = 
            // [state.constructor.saucesAndMains[action.payload.dragIndex],state.constructor.saucesAndMains[action.payload.hoverIndex]]
        },

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
    addToConstructor,
    deleteFromConstructor,
    sortInConstrucor
} = actions;