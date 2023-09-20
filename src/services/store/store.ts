import { configureStore } from '@reduxjs/toolkit';
import ingredients from "../slices/ingredients-slice"
import order from "../slices/order-slice"
import kit from "../slices/constructor-slice"
import user from "../slices/user-slice"
import feed from "../slices/feed-slice"
import profile from "../slices/profile-slice"
import orderData from "../slices/order-data-slice"
import { socketMiddleware } from '../middlewares/socket-middleware';
import { feedWS } from '../slices/feed-slice';
import { profileWS } from '../slices/profile-slice';



const middlewares = [socketMiddleware(feedWS), socketMiddleware(profileWS)]

const store = configureStore({
    reducer: {ingredients, order, kit, user, feed, profile, orderData},
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
      }).concat([...middlewares]),
    devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;