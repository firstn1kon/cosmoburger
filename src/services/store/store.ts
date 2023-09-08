import { configureStore } from '@reduxjs/toolkit';
import ingredients from "../slices/ingredients-slice"
import order from "../slices/order-slice"
import kit from "../slices/constructor-slice"
import user from "../slices/user-slice"

const store = configureStore({
    reducer: {ingredients, order, kit, user},
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;