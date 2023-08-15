import { getMe } from "./auth_reducer";
import { InferActionsTypes } from "./redux_store";

let initialState = {
    initialized: false
}

export type InitialStateType = typeof initialState;
type ActionType = InferActionsTypes<typeof actions>;


const appReducer = (state = initialState, action: ActionType): InitialStateType => {

    switch (action.type) {
        case 'app_reducer/INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            }

        default:
            return state;

    }
}


export const actions = {

    initializedSuccess: () => ({ type: 'app_reducer/INITIALIZED_SUCCESS' } as const)

}

export const initializeApp = () => (dispatch: any) => {    //  ThunkCreator
    
    let authUserDataPromise = dispatch(getMe());

    Promise.all([authUserDataPromise]).then(
        () => {
            dispatch(actions.initializedSuccess());
        }
    );

}


export default appReducer;