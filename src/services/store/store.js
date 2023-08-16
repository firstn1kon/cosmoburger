import { configureStore } from '@reduxjs/toolkit';
import ingredients from "../slices/ingredients-slice"
import order from "../slices/order-slice"
import kit from "../slices/constructor-slice"

const store = configureStore({
    reducer: {ingredients, order, kit},
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== "production",
});

export default store;