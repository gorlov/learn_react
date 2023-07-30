import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import thunkMiddleware from "redux-thunk";

import dialogsReducer from "./dialogs_reducer";
import profileReducer from "./profile_reducer";
import usersReducer from "./users_reducer";
import auth_reducer from "./auth_reducer";
import { reducer as formReducer } from 'redux-form'


let redusers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: auth_reducer,
    form: formReducer
});

let store = createStore(redusers, applyMiddleware(thunkMiddleware));


window.store = store;

export default store;