import { configureStore } from '@reduxjs/toolkit';
import main from "../slices/main-slice"
import order from "../slices/order-slice"

const store = configureStore({
    reducer: {main, order},
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== "production",
});

export default store;