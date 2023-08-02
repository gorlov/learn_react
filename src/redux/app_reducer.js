import { stopSubmit } from "redux-form";
import { authAPI } from "../api/api";
import { getMe } from "./auth_reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

let initialState = {
    initialized: false
}


const appReducer = (state = initialState, action) => {

    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }

        default:
            return state;

    }
}


export const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS });


export const initializeApp = () => (dispatch) => {    //  ThunkCreator
    
    let authUserDataPromise = dispatch(getMe());

    Promise.all([authUserDataPromise]).then(
        () => {
            dispatch(initializedSuccess());
        }
    );

}


export default appReducer;