import {combineReducers, legacy_createStore as createStore} from "redux";

import dialogsReducer from "./dialogs_reducer";
import profileReducer from "./profile_reducer";

let redusers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer
});

let store = createStore(redusers);


export default store;