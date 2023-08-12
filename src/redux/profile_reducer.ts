import { profileAPI } from "../api/api";
import { PostType, ProfileType, PhotosType, ContactsType } from "../types/types"

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POAST = 'DELETE_POAST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';


let initialState = {
    posts: [
        { id: 1, likesCount: 5, post: 'Do ex reprehenderit elit labore. Irure nisi qui dolore cupidatat incididunt nostrud culpa velit dolore anim Lorem officia. Do velit nulla mollit occaecat qui. Reprehenderit irure adipisicing non duis laboris tempor et sint irure eiusmod. Enim sunt et ullamco non in Lorem tempor cillum.' },
        { id: 2, likesCount: 13, post: 'Nulla ipsum voluptate ad laboris anim duis labore exercitation quis officia aute esse. Aliquip ipsum commodo proident non et culpa ea excepteur dolore irure tempor. Eu deserunt consectetur elit eiusmod excepteur voluptate cillum anim elit sint. Minim aute irure in duis nostrud do veniam reprehenderit veniam. Non consequat excepteur ex veniam. Qui velit minim irure elit voluptate consectetur adipisicing deserunt duis enim cupidatat est consectetur.' },
        { id: 3, likesCount: 7, post: 'Eiusmod quis magna Lorem elit ex sunt anim mollit laboris est cupidatat sunt ad mollit. Laboris minim adipisicing velit incididunt cillum eiusmod sint elit fugiat esse sit amet. Velit ipsum est dolor sit consectetur in mollit.' }
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: ''
}

export type InitialStateType = typeof initialState


const profileReducer = (state = initialState, action: any):InitialStateType => {

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
                posts: state.posts.filter(p => p.id != action.postId)
            }
        }

        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state, 
               profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }

        default:
            return state;

    }

}

type AddPostActionCreatorActionType = {
    type: typeof ADD_POST
    newPostElement: string
}
export const addPostActionCreator = (newPostElement: string): AddPostActionCreatorActionType => ({ type: ADD_POST, newPostElement });

type SetUserProfileActionCreator = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionCreator => ({ type: SET_USER_PROFILE, profile });

type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status: string): SetStatusActionType => ({ type: SET_STATUS, status });

type DeletePostActionType = {
    type: typeof DELETE_POAST
    postId: number
}
export const deletePost = (postId:number):DeletePostActionType => ({ type: DELETE_POAST, postId });

type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}
export const savePhotoSuccess = (photos:PhotosType):SavePhotoSuccessActionType => ({ type: SAVE_PHOTO_SUCCESS, photos });



export const getUserProfile = (userID:number) => {    //  ThunkCreator

    return (dispatch:any) => {
        profileAPI.getProfile(userID).then(responce => {
            dispatch(setUserProfile(responce.data));
        });
    }
}

export const getUserStatus = (userID:number) => {    //  ThunkCreator

    return (dispatch:any) => {
        profileAPI.getStatus(userID).then(responce => {
            
            dispatch(setStatus(responce.data));
        });
    }
}

export const updateUserStatus = (status:string) => {    //  ThunkCreator

    return (dispatch:any) => {
        profileAPI.updateStatus(status).then(responce => {
            if (responce.data.resultCode === 0) {
                dispatch(setStatus(status));
            }
        });
    }
}

export const savePhoto = (file:any) => {    //  ThunkCreator

    return (dispatch:any) => {
        profileAPI.aploadPhoto(file).then(responce => {
            if (responce.data.resultCode === 0) {
                dispatch(savePhotoSuccess(responce.data.data.photos));
            }
        });
    }
}

// export const saveProfile = (profile:ProfileType) => async (dispatch:any, getState: any) => {
//     const userID = getState().auth.userId;
//     const responce = await profileAPI.setUserProfile(profile)
// }

export default profileReducer;