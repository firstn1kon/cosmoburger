import { createSelector } from "@reduxjs/toolkit"
// Ingredients slice
export const getIngredients= state => state.ingredients.ingredients
export const getIsLoadingIngredients = state => state.ingredients.isLoading
export const getIsErrorIngredients = state => state.ingredients.isError
export const getIsIngredientModalOpen = state => state.ingredients.isIngredientModalOpen
export const getCurrentTab = state => state.ingredients.currentTab
export const getViewIngredientID = state => state.ingredients.viewIngredient
// Constructor slice
export const getHelper = state => state.kit.helper
export const getBun = state => state.kit.bun
export const getSaucesAndMains = state => state.kit.saucesAndMains
// Order slice
export const getIsLoadingOrder = state => state.order.isLoading
export const getIsErrorOrder = state => state.order.isError
export const getIsOrderModalOpen = state => state.order.isOrderModalOpen
export const getNumberOrder = state => state.order.data.order.number

//CreateSelectors
export const getModalIngredient = createSelector(
    getIngredients,
    getViewIngredientID,
    (ingredients, id) => ingredients.find(ingredient => ingredient._id === id)
)