// Ingredients slice
export const getIngredients= state => state.ingredients.ingredients
export const getIsLoadingIngredients = state => state.ingredients.isLoading
export const getIsErrorIngredients = state => state.ingredients.isError
export const getCurrentTab = state => state.ingredients.currentTab
// Constructor slice
export const getHelper = state => state.kit.helper
export const getBun = state => state.kit.bun
export const getSaucesAndMains = state => state.kit.saucesAndMains
// Order slice
export const getIsLoadingOrder = state => state.order.isLoading
export const getIsErrorOrder = state => state.order.isError
export const getIsOrderModalOpen = state => state.order.isOrderModalOpen
export const getNumberOrder = state => state.order.data.order.number
// User Slice 
export const getIsLoadingUser = state => state.user.isLoading
export const getIsErrorUser = state => state.user.isError
export const getTransfer = state => state.user.transfer
export const getUserData = state => state.user.user
export const getUserName = state => state.user.user.name
export const getIsAuth = state => state.user.isCkechedAuth