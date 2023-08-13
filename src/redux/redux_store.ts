import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import thunkMiddleware from "redux-thunk";

import dialogsReducer from "./dialogs_reducer";
import profileReducer from "./profile_reducer";
import usersReducer from "./users_reducer";
import auth_reducer from "./auth_reducer";
import { reducer as formReducer } from 'redux-form';
import appReducer from "./app_reducer";
import logs_reducer from "./logs_reducer";


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: auth_reducer,
    form: formReducer,
    app: appReducer,
    logs: logs_reducer
});

    type RootReducerType = typeof rootReducer;
    export type AppStateRedicerType = ReturnType<RootReducerType>


let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));


// @ts-ignore
window.store = store;

export default store;