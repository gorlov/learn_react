const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE'

let initialState = {
    dialogs: [
        { id: 1, name: 'gav' },
        { id: 2, name: 'avg' },
        { id: 3, name: 'merlin' },
        { id: 4, name: 'xeron' },
    ],
    messages: [
        { id: 1, message: 'h!' },
        { id: 2, message: 'WTF!?' },
        { id: 3, message: 'ИТ кот-задрот в зеленых тонах' },
        { id: 4, message: 'На интересной работе и сны интересные!' },
    ],
    newMessageBody: ''
}

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {

        case UPDATE_NEW_MESSAGE_BODY:
            return {
                ...state,
                newMessageBody:  action.newMessageBody
            }

        case SEND_MESSAGE:
            let body = state.newMessageBody;
            return {
                ...state,
                messages:[ ...state.messages, { id: 5, message: body }],
                newMessageBody: '',
            }

        default:
            return state;

    }

}


export const sendMessageCreator = () => ({type: SEND_MESSAGE});

export const updateNewMessageBodyCreator = (newMsg) => ({type: UPDATE_NEW_MESSAGE_BODY, newMessageBody: newMsg});

export default dialogsReducer;
