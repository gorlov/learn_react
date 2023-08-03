
import { logAPI } from "../api/ignAPI";

let initialState = {
    lineFrom: null,
    lineTo: null,
    showInfo: true,
    showWarn: true,
    showError: true,
    warnCount: 0,
    errorCount: 0
}


const logs_reducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data
            }

        case TOGGLE_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state;

    }
}






export const login = (email, password, rememberMe) => {    //  ThunkCreator

    return (dispatch) => {
        authAPI.login(email, password, rememberMe).then(
            responce => {
                console.log(responce);
                if (responce.data.resultCode === 0) {
                    dispatch(getMe());
                } else {
                    let errMsg = responce.data.messages.length > 0 ? responce.data.messages[0] : "Unknown error..."
                    dispatch(stopSubmit('login', { _error: errMsg }));
                }
            });
    }
}