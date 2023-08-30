import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
        bun: false,
        saucesAndMains: [],
        helper: true
}

const constructorSlice = createSlice({
    name: 'kit',
    initialState,
    reducers: {
        addToConstructor: {
            reducer: (state, action) => {
                if (action.payload.type === 'bun') {
                    state.bun = action.payload;
                }
                else {
                    state.saucesAndMains.unshift(action.payload)
                }
                state.helper = false;
            },
            prepare: (payload) => ({payload: {...payload, _uid: nanoid()}})
          },
        deleteFromConstructor: (state, action) => {
            const index = state.saucesAndMains.findIndex(item => item._uid === action.payload)
            if (index !== -1) state.saucesAndMains.splice(index, 1)
            if(!state.saucesAndMains.length && !state.bun) state.helper = true
        },
        sortInConstrucor: (state, action) => {
            let temp = state.saucesAndMains[action.payload.hoverIndex]
            state.saucesAndMains[action.payload.hoverIndex] = state.saucesAndMains[action.payload.dragIndex];
            state.saucesAndMains[action.payload.dragIndex] = temp
        },
        resetConstructor: () => ({...initialState}),
    },
})


const {actions, reducer} = constructorSlice;

export default reducer;

export const {
    addToConstructor,
    deleteFromConstructor,
    sortInConstrucor,
    resetConstructor,
} = actions;