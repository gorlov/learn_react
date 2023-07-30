import { stopSubmit } from "redux-form";
import { authAPI } from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';

const TOGGLE_FETCHING = 'TOGGLE_FETCHING';



let initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    isFetching: false
}


const auth_reducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data
            }

        case TOGGLE_FETCHING:
            console.log(`isFetching = ${action.isFetching}`);
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state;

    }
}


export const setAuthUserData = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, data: { userId, email, login, isAuth } });

export const toggleFetching = (isFetching) => ({ type: TOGGLE_FETCHING, isFetching });


export const getMe = () => {    //  ThunkCreator
    return (dispatch) => {
        authAPI.getMe().then(
            data => {
                if (data.resultCode === 0) {
                    let { id, login, email } = data.data;
                    dispatch(setAuthUserData(id, email, login, true));
                }
            });
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
                    dispatch(stopSubmit('login', {_error: errMsg } ));
                }
            });
    }
}

export const logout = () => {    //  ThunkCreator
    return (dispatch) => {
        authAPI.logout().then(responce => {
            if (responce.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false));
            }
        });
    }
}

export default auth_reducer;