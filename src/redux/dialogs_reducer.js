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
        { id: 3, message: 'Pariatur exercitation enim deserunt ad.' },
        { id: 4, message: 'Eiusmod nostrud magna adipisicing ad.' },
    ],
    newMessageBody: ''
}

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {

        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.newMessageBody;
            return state;


        case SEND_MESSAGE:
            let body = state.newMessageBody;
            state.newMessageBody = '';
            state.messages.push({ id: 5, message: body });
            return state;

        default:
            return state;

    }

}


export const sendMessageCreator = () => ({type: SEND_MESSAGE});

export const updateNewMessageBodyCreator = (newMsg) => ({type: UPDATE_NEW_MESSAGE_BODY, newMessageBody: newMsg});

export default dialogsReducer;
