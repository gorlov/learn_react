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
    ]
}

const dialogsReducer = (state = initialState, action) => {

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


export const sendMessageCreator = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody});

export default dialogsReducer;
