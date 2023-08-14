import { createSlice, createAsyncThunk, createSelector, nanoid } from "@reduxjs/toolkit";
import { getAllIngredients } from "../../utils/api";

const initialState = {
    ingredients: [],
    isLoading: false,
    isError: false,
    constructor: [],
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
                    const index = state.constructor.findIndex(item => item.type === 'bun')
                    index !== -1 
                        ? state.constructor.splice(index, 1, action.payload)
                        : state.constructor.push(action.payload)
                }
                else {
                    state.constructor.push(action.payload)
                }
            },
            prepare: (payload) => ({payload: {...payload, _uid: nanoid()}})
          },
        deleteFromConstructor: (state, action) => ({...state, constructor: state.constructor.filter(item => item._uid !== action.payload)}),
        sortInConstrucor: (state, action) => {
            // const dragCard = state.constructor[action.payload.dragIndex];
            // state.constructor.splice(action.payload.dragIndex,0); 
            // state.constructor.splice(action.payload.hoverIndex,0, dragCard)
            // let temp = state.constructor[action.payload.hoverIndex]
            // state.constructor[action.payload.hoverIndex] = state.constructor[action.payload.dragIndex];
            // state.constructor[action.payload.dragIndex] = temp
            [state.constructor[action.payload.hoverIndex], state.constructor[action.payload.dragIndex]] = [state.constructor[action.payload.dragIndex],state.constructor[action.payload.hoverIndex]]

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