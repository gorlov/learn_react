import { type } from "@testing-library/user-event/dist/type";

const SEND_MESSAGE = 'SEND-MESSAGE'

 
export type InitialStateType = typeof initialState;

type DialogType = {
    id: number
    name: string
}

type MessageType = {
    id: number
    message: string
}



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

const dialogsReducer = (state = initialState, action: any) => {

    switch (action.type) {

        case SEND_MESSAGE:
            let body = action.newMessageBody;
            return {
                ...state,
                messages:[ ...state.messages, { id: 5, message: body }],

            }

        default:
            return state;

    }

}

type SendMessageCreatorAtionType = {
    type: typeof SEND_MESSAGE
    newMessageBody: string
}

export const sendMessageCreator = (newMessageBody: string): SendMessageCreatorAtionType => ({type: SEND_MESSAGE, newMessageBody});

export default dialogsReducer;
