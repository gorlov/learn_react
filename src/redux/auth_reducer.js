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
                ...action.data,
                isAuth: true
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


export const setAuthUserData = (userId, email, login) => ({ type: SET_USER_DATA, data: { userId, email, login } });

export const toggleFetching = (isFetching) => ({ type: TOGGLE_FETCHING, isFetching });


export const getMe = () => {    //  ThunkCreator
    return (dispatch) => {
        authAPI.getMe().then(
            data => {
            if (data.resultCode === 0) {
                let {id, login, email} = data.data;
                dispatch(setAuthUserData(id, email, login));
            }
        });
    }
}


export default auth_reducer;