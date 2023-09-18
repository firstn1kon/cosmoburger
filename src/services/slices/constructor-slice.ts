import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { IConcstructorIngredient } from "../../utils/types/common.types";
import sample from "../../images/samplebun.png"
import { SliceActions } from "../../utils/types/common.types";

interface IBasicbun {
    name: string, 
    price: number, 
    image_mobile: string, 
    _id: string

}

interface IConstructorState {
    bun:  IBasicbun | IConcstructorIngredient
    saucesAndMains: IConcstructorIngredient[],
    helper: boolean,
    isBunAdd: boolean, 
}

const initialState: IConstructorState = {
        bun: {
            name: "выберете булку",
            price: 0,
            image_mobile: sample,
            _id: ""
        },
        saucesAndMains: [],
        helper: true,
        isBunAdd: false
}

const constructorSlice = createSlice({
    name: 'kit',
    initialState,
    reducers: {
        addToConstructor: {
            reducer: (state, action: PayloadAction<IConcstructorIngredient>) => {
                if (action.payload.type === 'bun') {
                    state.bun = action.payload;
                    state.isBunAdd = true;
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
            if(!state.saucesAndMains.length && !state.bun._id) state.helper = true
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

export type TKitActions = SliceActions<typeof constructorSlice.actions>;