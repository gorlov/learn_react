import { stopSubmit } from "redux-form";
import { ResultCodesEnum } from "../api/api";
import { authAPI } from "../api/auth-api";
import { BaseThunkType, InferActionsTypes } from "./redux_store";

const SET_USER_DATA = 'SET_USER_DATA';

const TOGGLE_FETCHING = 'TOGGLE_FETCHING';

let initialState = {
    userId: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false,
    isFetching: false,
    captchaUrl: null as string | null
}

const actions = {
    toggleFetching: (isFetching: boolean) => ({ type: TOGGLE_FETCHING, isFetching } as const),
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => {
        return { type: SET_USER_DATA, data: { userId, email, login, isAuth } } as const;
    }
}

const auth_reducer = (state = initialState, action: ActionsType): InitialStateType => {

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

// type SetAuthUserDataActionType = {
//     userId: number | null
//     email: string | null
//     login: string | null
//     isAuth: boolean
// }

// type SetAuthActionType = {
//     type: typeof SET_USER_DATA,
//     data: SetAuthUserDataActionType
// }

// type ToggleFetchingActionType = {
//     type: typeof TOGGLE_FETCHING
//     isFetching: boolean
// }


export const getMe = () => async (dispatch: any) => {    //  ThunkCreator

    let meData = await authAPI.me();

    if (meData.resultCode === ResultCodesEnum.Success) {
        let { id, email, login } = meData.data;
        console.log({ id, email, login });
        dispatch(actions.setAuthUserData(id, email, login, true));
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
                dispatch(actions.setAuthUserData(null, null, null, false));
            }
        });
    }
}

export default auth_reducer;


export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;