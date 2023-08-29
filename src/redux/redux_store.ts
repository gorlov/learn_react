import { Action, applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import thunkMiddleware, { ThunkAction } from "redux-thunk";

import dialogsReducer from "./dialogs_reducer";
import profileReducer from "./profile_reducer";
import usersReducer from "./users_reducer";
import auth_reducer from "./auth_reducer";
import { reducer as formReducer } from 'redux-form';
import appReducer from "./app_reducer";
import logs_reducer from "./logs_reducer";
import chat_reducer from "./chat_reducer";


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: auth_reducer,
    form: formReducer,
    app: appReducer,
    chat: chat_reducer,
    logs: logs_reducer
});

// type PropetiesTypes<T> = T extends {[key: string]: infer U} ? U : never;
// export type InferActionsTypes<T extends {[key: string]: ( ...args: any[]) => infer U}> = ReturnType<PropetiesTypes<T>>;

export type InferActionsTypes<T> = T extends {[key: string]: ( ...args: any[]) =>  infer U} ? U : never;

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateRedicerType, unknown, A>;

type RootReducerType = typeof rootReducer;
export type AppStateRedicerType = ReturnType<RootReducerType>;


let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));


// @ts-ignore
window.store = store;

export default store;