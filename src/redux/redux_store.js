import {combineReducers, legacy_createStore as createStore} from "redux";

import dialogsReducer from "./dialogs_reducer";
import profileReducer from "./profile_reducer";
import usersReducer from "./users_reducer";

let redusers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer
});

let store = createStore(redusers);


window.store = store;

export default store;