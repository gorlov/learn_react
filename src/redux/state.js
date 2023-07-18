import dialogsReducer from "./dialogs_reducer";
import profileReducer from "./profile_reducer";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST = 'UPDATE-NEW-POST';

const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE'


let store = {

    _state: {

        profilePage: {

            posts: [
                { id: 1, likesCount: 5, post: 'Do ex reprehenderit elit labore. Irure nisi qui dolore cupidatat incididunt nostrud culpa velit dolore anim Lorem officia. Do velit nulla mollit occaecat qui. Reprehenderit irure adipisicing non duis laboris tempor et sint irure eiusmod. Enim sunt et ullamco non in Lorem tempor cillum.' },
                { id: 2, likesCount: 13, post: 'Nulla ipsum voluptate ad laboris anim duis labore exercitation quis officia aute esse. Aliquip ipsum commodo proident non et culpa ea excepteur dolore irure tempor. Eu deserunt consectetur elit eiusmod excepteur voluptate cillum anim elit sint. Minim aute irure in duis nostrud do veniam reprehenderit veniam. Non consequat excepteur ex veniam. Qui velit minim irure elit voluptate consectetur adipisicing deserunt duis enim cupidatat est consectetur.' },
                { id: 3, likesCount: 7, post: 'Eiusmod quis magna Lorem elit ex sunt anim mollit laboris est cupidatat sunt ad mollit. Laboris minim adipisicing velit incididunt cillum eiusmod sint elit fugiat esse sit amet. Velit ipsum est dolor sit consectetur in mollit.' }
            ],

            newPostText: '... и животноводство!'
        },

        dialogsPage: {

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

    },

    _callSubscriber() {
        console.log('h! from state.js');
    },

    getState() {
        return this._state;
    },

    subscribe(observer) {

        this._callSubscriber = observer;

    },

    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);

        this._callSubscriber(this._state);

    }

}
    

window.store = store;

export default store;