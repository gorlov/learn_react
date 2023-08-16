import { type } from "@testing-library/user-event/dist/type";
import { InferActionsTypes } from "./redux_store";

export type InitialStateType = typeof initialState;

type DialogType = {
    id: number
    name: string
}

type MessageType = {
    id: number
    message: string
}

type ActionsType = InferActionsTypes<typeof actions>


let initialState = {
    dialogs: [
        { id: 1, name: 'gav' },
        { id: 2, name: 'avg' },
        { id: 3, name: 'merlin' },
        { id: 4, name: 'xeron' },
    ] as Array<DialogType>,
    messages: [
        { id: 1, message: 'h!' },
        { id: 2, message: 'WTF!?' },
        { id: 3, message: 'ИТ кот-задрот в зеленых тонах' },
        { id: 4, message: 'На интересной работе и сны интересные!' },
    ] as Array<MessageType>
}

const dialogsReducer = (state = initialState, action: ActionsType) => {

    switch (action.type) {

        case '/dialogs_reducer/SEND-MESSAGE':
            let body = action.newMessageBody;
            return {
                ...state,
                messages:[ ...state.messages, { id: 5, message: body }],

            }

        default:
            return state;

    }

}


export const actions = {
    sendMessageCreator: (newMessageBody: string) => ({type: '/dialogs_reducer/SEND-MESSAGE', newMessageBody})
}


export default dialogsReducer;
