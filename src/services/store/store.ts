import { configureStore } from '@reduxjs/toolkit';
import ingredients from "../slices/ingredients-slice"
import order from "../slices/order-slice"
import kit from "../slices/constructor-slice"
import user from "../slices/user-slice"
import feed from "../slices/feed-slice"
import profile from "../slices/profile-slice"
import { socketMiddleware } from '../middlewares/socket-middleware';
import { TWsActions } from '../../utils/types/websocket.types';

const feedWS: TWsActions = {
    wsInit: "feed/initWS",
    wsOffline: "feed/closeWS",
    onOpen: "feed/openWS",
    onError: "feed/errorWS",
    onMessage: "feed/messageWS",
    onClose: "feed/handleClose"
}

const profileWS: TWsActions = {
    wsInit: "profile/initWS",
    wsOffline: "profile/closeWS",
    onOpen: "profile/openWS",
    onError: "profile/errorWS",
    onMessage: "profile/messageWS",
    onClose: "profile/handleClose"
}

const store = configureStore({
    reducer: {ingredients, order, kit, user, feed, profile},
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
      }).concat([socketMiddleware(feedWS), socketMiddleware(profileWS)]),
    devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;