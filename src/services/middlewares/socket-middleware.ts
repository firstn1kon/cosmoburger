import { Middleware, MiddlewareAPI } from "redux";
import { RootState, AppDispatch } from "../store/store";
import { TWsActions, TAllAppActions } from "../../utils/types/websocket.types";
import { refreshToken, _loginPage } from "../../utils/api";
import { getAccessTokenWs, removeAllTokens } from "../../utils/utils";

export const socketMiddleware = (wsActions: TWsActions): Middleware => {
    return (store: MiddlewareAPI<AppDispatch, RootState>)  =>  {
        let socket: WebSocket | null = null;
        let url = "";

        return next => (action: TAllAppActions) => {
            const { type } = action;
            const { dispatch } = store;
            const { wsInit, wsOffline, onOpen, onError, onMessage, onClose } = wsActions;

            if (type === wsInit) {
                if(typeof action.payload === "string") {
                    url = action.payload;
                    socket = new WebSocket(`${url}`);
                } 
            }

            if (type === wsOffline) {
                if (socket) {
                    socket.close(1000, `Normal Closure`)
                    socket = null;
                }
            }

            if (socket) {
                socket.onopen = () => {
                    dispatch({ type: onOpen });
                };
                socket.onerror = (event) => {
                    dispatch({ type: onError, payload: event.type});
                };
                socket.onmessage = event => {
                    const { data } = event;
                    const message = JSON.parse(data);
                    if(message.message === "Invalid or missing token") {
                        refreshToken()
                            .then(()=> {
                                const newUrl = new URL(url)
                                newUrl.searchParams.set("token", getAccessTokenWs() as string);
                                dispatch({ type: wsInit, payload: newUrl.href })
                            })
                            .catch(()=> {
                                removeAllTokens(); 
                                window.location.replace(_loginPage)
                            })
                    }
                    else {
                        dispatch({ type: onMessage, payload: message });
                    }
                };
                socket.onclose = event => {
                    dispatch({ type: onClose, payload: String(event.code)});
                };
            }

            next(action);
        };
    };
}; 