import { getMe } from "./auth_reducer";

const INITIALIZED_SUCCESS = 'app_reducer/INITIALIZED_SUCCESS';

export type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false
}


const appReducer = (state = initialState, action: any): InitialStateType => {

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

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): InitializedSuccessActionType => ({ type: INITIALIZED_SUCCESS });


export const initializeApp = () => (dispatch: any) => {    //  ThunkCreator
    
    let authUserDataPromise = dispatch(getMe());

    Promise.all([authUserDataPromise]).then(
        () => {
            dispatch(initializedSuccess());
        }
    );

}


export default appReducer;