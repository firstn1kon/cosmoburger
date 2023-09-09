import { RootState } from "../store/store"

// Ingredients slice
export const getIngredients= (state: RootState) => state.ingredients.ingredients
export const getIsLoadingIngredients = (state: RootState) => state.ingredients.isLoading
export const getIsErrorIngredients = (state: RootState) => state.ingredients.isError
export const getCurrentTab = (state: RootState) => state.ingredients.currentTab
// Constructor slice
export const getHelper = (state: RootState) => state.kit.helper
export const getBun = (state: RootState) => state.kit.bun
export const getSaucesAndMains = (state: RootState) => state.kit.saucesAndMains
export const getIsBunAdd = (state: RootState) => state.kit.isBunAdd
// Order slice
export const getIsLoadingOrder = (state: RootState) => state.order.isLoading
export const getIsErrorOrder = (state: RootState) => state.order.isError
export const getIsOrderModalOpen = (state: RootState) => state.order.isOrderModalOpen
export const getNumberOrder = (state: RootState) => state.order.data.order.number
// User Slice 
export const getIsLoadingUser = (state: RootState) => state.user.isLoading
export const getIsErrorUser = (state: RootState) => state.user.isError
export const getTransfer = (state: RootState) => state.user.transfer
export const getUserData = (state: RootState) => state.user.user
export const getUserName = (state: RootState) => state.user.user.name
export const getIsAuth = (state: RootState) => state.user.isCkechedAuth