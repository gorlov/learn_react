import { stopSubmit } from "redux-form";
import { ResultCodesEnum, authAPI } from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';

const TOGGLE_FETCHING = 'TOGGLE_FETCHING';

// export type InitialStateType = {
//     userId: number | null
//     login: string | null
//     email: string | null
//     isAuth: boolean
//     isFetching: boolean
//     captchaUrl: string | null
// }


let initialState = {
    userId: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false,
    isFetching: false,
    captchaUrl: null as string | null
}

export type InitialStateType = typeof initialState;

// type AuthReducerActionType = {
//     type: 
// }

const auth_reducer = (state = initialState, action: any): InitialStateType => {

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

type SetAuthUserDataActionType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

type SetAuthActionType = {
    type: typeof SET_USER_DATA,
    data: SetAuthUserDataActionType
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthActionType => {
    return { type: SET_USER_DATA, data: { userId, email, login, isAuth } };
}


type ToggleFetchingActionType = {
    type: typeof TOGGLE_FETCHING
    isFetching: boolean
}

export const toggleFetching = (isFetching: boolean) => ({ type: TOGGLE_FETCHING, isFetching });


export const getMe = () => async (dispatch: any) => {    //  ThunkCreator

    let meData = await authAPI.me();

    if (meData.resultCode === ResultCodesEnum.Success) {
        let { id, email, login } = meData.data;
        console.log({ id, email, login });
        dispatch(setAuthUserData(id, email, login, true));
    }

}


export const login = (email: string, password: string, rememberMe: boolean) => async (dispatch: any) => {    //  ThunkCreator

    let loginData = await authAPI.login(email, password, rememberMe);

    if (loginData.resultCode === ResultCodesEnum.Success) {
        dispatch(getMe());
    } else {
        let errMsg = loginData.messages.length > 0 ? loginData.messages[0] : "Unknown error..."
        dispatch(stopSubmit('login', { _error: errMsg }));
    }

}


export const logout = () => {    //  ThunkCreator
    return (dispatch: any) => {
        authAPI.logout().then(responce => {
            if (responce.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false));
            }
        });
    }
}

export default auth_reducer;