import { profileAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POAST = 'DELETE_POAST';


let initialState = {
    posts: [
        { id: 1, likesCount: 5, post: 'Do ex reprehenderit elit labore. Irure nisi qui dolore cupidatat incididunt nostrud culpa velit dolore anim Lorem officia. Do velit nulla mollit occaecat qui. Reprehenderit irure adipisicing non duis laboris tempor et sint irure eiusmod. Enim sunt et ullamco non in Lorem tempor cillum.' },
        { id: 2, likesCount: 13, post: 'Nulla ipsum voluptate ad laboris anim duis labore exercitation quis officia aute esse. Aliquip ipsum commodo proident non et culpa ea excepteur dolore irure tempor. Eu deserunt consectetur elit eiusmod excepteur voluptate cillum anim elit sint. Minim aute irure in duis nostrud do veniam reprehenderit veniam. Non consequat excepteur ex veniam. Qui velit minim irure elit voluptate consectetur adipisicing deserunt duis enim cupidatat est consectetur.' },
        { id: 3, likesCount: 7, post: 'Eiusmod quis magna Lorem elit ex sunt anim mollit laboris est cupidatat sunt ad mollit. Laboris minim adipisicing velit incididunt cillum eiusmod sint elit fugiat esse sit amet. Velit ipsum est dolor sit consectetur in mollit.' }
    ],
    profile: null,
    status: ''
}


const profileReducer = (state = initialState, action) => {

    switch (action.type) {

        case ADD_POST:
            let newPost = {
                id: 5,
                post: action.newPostElement,
                likesCount: 0
            };

            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }

        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }

        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }

        case DELETE_POAST: {
            return {
                ...state, 
                post: state.posts.filter(p => p.id != action.postId)
            }
        }


        default:
            return state;

    }

}


export const addPostActionCreator = (newPostElement) => ({ type: ADD_POST, newPostElement });

export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });

export const setStatus = (status) => ({ type: SET_STATUS, status });

export const deletePost = (postId) => ({ type: DELETE_POAST, postId });


export const getUserProfile = (userID) => {    //  ThunkCreator

    return (dispatch) => {
        profileAPI.getProfile(userID).then(responce => {
            dispatch(setUserProfile(responce.data));
        });
    }
}

export const getUserStatus = (userID) => {    //  ThunkCreator

    return (dispatch) => {
        profileAPI.getStatus(userID).then(responce => {
            
            dispatch(setStatus(responce.data));
        });
    }
}

export const updateUserStatus = (status) => {    //  ThunkCreator

    return (dispatch) => {
        profileAPI.updateStatus(status).then(responce => {
            if (responce.data.resultCode === 0) {
                dispatch(setStatus(status));
            }
        });
    }
}

export default profileReducer;