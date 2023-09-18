import { Middleware, MiddlewareAPI } from "redux";
import { RootState, AppDispatch } from "../store/store";
import { TWsActions, TAllAppActions } from "../../utils/types/websocket.types";

export const socketMiddleware = (wsActions: TWsActions): Middleware => {
    return (store: MiddlewareAPI<AppDispatch, RootState>)  =>  {
        let socket: WebSocket | null = null;
        let url = "";

        return next => (action: TAllAppActions) => {
            const { type } = action;
            const { dispatch } = store;
            const { wsInit, wsOffline, onOpen, onError, onMessage, onClose } = wsActions;

            if (type === wsInit) {
                url = action.payload;
                socket = new WebSocket(`${url}`);
            }

            if (type === wsOffline) {
                if (socket) {
                    socket.close(1000, `Websocket closed`)
                    socket = null;
                    console.log('closed')
                }
            }

            if (socket) {
                socket.onopen = () => {
                    dispatch({ type: onOpen });
                };
                socket.onerror = (event) => {
                    dispatch({ type: onError, payload: event});
                };
                socket.onmessage = event => {
                    const { data } = event;
                    const message = JSON.parse(data);
                    dispatch({ type: onMessage, payload: message });
                };
                socket.onclose = event => {
                    dispatch({ type: onClose, payload: event.code.toString() });
                };
            }

            next(action);
        };
    };
}; 

//сделать refresh   