import { ResultCodesEnum } from "../api/api";
import { profileAPI } from "../api/profile-api";
import { PostType, ProfileType, PhotosType, ContactsType } from "../types/types"
import { BaseThunkType, InferActionsTypes } from "./redux_store";

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

export type InitialStateType = typeof initialState;

type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;


const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {

        case '/profile_reducer/ADD-POST':
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

        case '/profile_reducer/SET_USER_PROFILE': {
            return {
                ...state,
                profile: action.profile
            }
        }

        case '/profile_reducer/SET_STATUS': {
            return {
                ...state,
                status: action.status
            }
        }

        case '/profile_reducer/DELETE_POST': {
            return {
                ...state,
                posts: state.posts.filter(p => p.id != action.postId)
            }
        }

        case '/profile_reducer/SAVE_PHOTO_SUCCESS': {
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos } as ProfileType
            }
        }

        default:
            return state;

    }

}

export const actions = {
    addPostActionCreator: (newPostElement: string) => ({ type: '/profile_reducer/ADD-POST', newPostElement } as const),
    setUserProfile: (profile: ProfileType) => ({ type: '/profile_reducer/SET_USER_PROFILE', profile } as const),
    setStatus: (status: string) => ({ type: '/profile_reducer/SET_STATUS', status } as const),
    deletePost: (postId: number) => ({ type: '/profile_reducer/DELETE_POST', postId } as const),
    savePhotoSuccess: (photos: PhotosType) => ({ type: '/profile_reducer/SAVE_PHOTO_SUCCESS', photos } as const)
}

export const getUserProfile = (userID: number): ThunkType => async (dispatch) => {    //  ThunkCreator
    let responce = await profileAPI.getProfile(userID);
    dispatch(actions.setUserProfile(responce));
}

export const getUserStatus = (userID: number): ThunkType => async (dispatch) => {    //  ThunkCreator
    let responce = await profileAPI.getStatus(userID);
    dispatch(actions.setStatus(responce));
}

export const updateUserStatus = (status: string): ThunkType => async (dispatch) => {    //  ThunkCreator
    let responce = await profileAPI.updateStatus(status);
    if (responce.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setStatus(status));
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {    //  ThunkCreator
    let responce = await profileAPI.aploadPhoto(file);
    if (responce.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.savePhotoSuccess(responce.data.photos));
    }

}

// export const saveProfile = (profile:ProfileType) => async (dispatch:any, getState: any) => {
//     const userID = getState().auth.userId;
//     const responce = await profileAPI.setUserProfile(profile)
// }

export default profileReducer;