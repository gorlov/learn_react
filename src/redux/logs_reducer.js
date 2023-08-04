
import { logAPI } from "../api/ignAPI";

const SET_LOG_LINES = 'SET_LOG_LINES';

let initialState = {
    logLines: '',
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
        // case SET_USER_DATA:
        //     return {
        //         ...state,
        //         ...action.data
        //     }

        // case TOGGLE_FETCHING:
        //     return {
        //         ...state,
        //         isFetching: action.isFetching
        //     }

        default:
            return state;

    }
}


// const setLogLines = () => ({ type: SET_LOG_LINES, strLines });



export const loadLines = (lineFrom, lineTo, path) => {    //  ThunkCreator

    return (dispatch) => {

        logAPI.getLines(lineFrom, lineTo, path).then(
            responce => {
                console.log(responce);
                // if (responce.data.resultCode === 0) {
                //     dispatch(getMe());
                // } else {
                //     let errMsg = responce.data.messages.length > 0 ? responce.data.messages[0] : "Unknown error..."
                //     dispatch(stopSubmit('login', { _error: errMsg }));
                // }
            });
    }
}


export default logs_reducer;