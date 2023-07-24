import {combineReducers, legacy_createStore as createStore} from "redux";

import dialogsReducer from "./dialogs_reducer";
import profileReducer from "./profile_reducer";
import usersReducer from "./users_reducer";
import auth_reducer from "./auth_reducer";

let redusers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: auth_reducer
});

let store = createStore(redusers);


window.store = store;

export default store;