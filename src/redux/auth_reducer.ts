import { stopSubmit } from "redux-form";
import { ResultCodesEnum } from "../api/api";
import { authAPI } from "../api/auth-api";
import { BaseThunkType, InferActionsTypes } from "./redux_store";


let initialState = {
    userId: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false,
    isFetching: false,
    captchaUrl: null as string | null
}

const actions = {
    toggleFetching: (isFetching: boolean) => ({ type: '/auth_ruducer/TOGGLE_FETCHING', isFetching } as const),
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => {
        return { type: '/auth_ruducer/SET_USER_DATA', data: { userId, email, login, isAuth } } as const;
    }
}

const auth_reducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {

        case '/auth_ruducer/SET_USER_DATA':
            return {
                ...state,
                ...action.data
            }

        case '/auth_ruducer/TOGGLE_FETCHING':
            console.log(`isFetching = ${action.isFetching}`);
            return {
                ...state,
                isFetching: action.isFetching
            }

        default:
            return state;

    }
}


export const getMe = ():ThunkType => async (dispatch) => {    //  ThunkCreator

    let meData = await authAPI.me();

    if (meData.resultCode === ResultCodesEnum.Success) {
        let { id, email, login } = meData.data;
        dispatch(actions.setAuthUserData(id, email, login, true));
    }

}


export const login = (email: string, password: string, rememberMe: boolean):ThunkType => async (dispatch) => {    //  ThunkCreator

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
type ThunkType = BaseThunkType<ActionsType | ReturnType<typeof stopSubmit>>;