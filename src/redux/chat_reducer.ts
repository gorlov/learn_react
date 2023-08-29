import { stopSubmit } from "redux-form";
import { ResultCodesEnum } from "../api/api";
import { authAPI } from "../api/auth-api";
import { BaseThunkType, InferActionsTypes } from "./redux_store";
import { ChatMessageType, chatAPI } from "../api/chat-api";
import { Dispatch } from "redux";


let initialState = {
    messages: [] as ChatMessageType[]
}

const actions = {
    messagesReceived: (messages: ChatMessageType[]) => ({ type: '/chat_reducer/MESSAGE_RECEIVED', payload: { messages } } as const)
}

const chat_reducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {

        case '/chat_reducer/MESSAGE_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages],
            }

        default:
            return state;

    }
}

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null;

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages));
        }
    }
    return _newMessageHandler;
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {    //  ThunkCreator

    chatAPI.start();
    chatAPI.subscribe(newMessageHandlerCreator(dispatch));

}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {    //  ThunkCreator

    chatAPI.unsubscribe(newMessageHandlerCreator(dispatch));

}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {    //  ThunkCreator

    chatAPI.sendMessage(message);

}

export default chat_reducer;


export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType | ReturnType<typeof stopSubmit>>;