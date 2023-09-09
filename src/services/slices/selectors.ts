import { RootState } from "../store/store"

// Ingredients slice
export const getIngredients= (state: any) => state.ingredients.ingredients
export const getIsLoadingIngredients = (state: any) => state.ingredients.isLoading
export const getIsErrorIngredients = (state: any) => state.ingredients.isError
export const getCurrentTab = (state: any) => state.ingredients.currentTab
// Constructor slice
export const getHelper = (state: any) => state.kit.helper
export const getBun = (state: any) => state.kit.bun
export const getSaucesAndMains = (state: any) => state.kit.saucesAndMains
// Order slice
export const getIsLoadingOrder = (state: any) => state.order.isLoading
export const getIsErrorOrder = (state: any) => state.order.isError
export const getIsOrderModalOpen = (state: any) => state.order.isOrderModalOpen
export const getNumberOrder = (state: RootState) => state.order.data.order.number
// User Slice 
export const getIsLoadingUser = (state: any) => state.user.isLoading
export const getIsErrorUser = (state: any) => state.user.isError
export const getTransfer = (state: any) => state.user.transfer
export const getUserData = (state: any) => state.user.user
export const getUserName = (state: any) => state.user.user.name
export const getIsAuth = (state: any) => state.user.isCkechedAuth