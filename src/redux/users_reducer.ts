import { ThunkAction } from "redux-thunk";
import { userAPI } from "../api/users-api";
import { PostType, ProfileType, PhotosType, ContactsType, UserType } from "../types/types"
import { AppStateRedicerType, BaseThunkType, InferActionsTypes } from "./redux_store";
import { ResultCodesEnum } from "../api/api";


let initialState = {
    users: [] as Array<UserType>,
    pageSize: 20,
    totalUsersCount: 0,
    currentPageNumber: 1,
    isFetching: false,
    followingInProgress: [] as Array<number> // array of users id's
}

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case '/users_reducer/FOLLOW':
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    }
                    return u;
                })
            }

        case '/users_reducer/UNFOLLOW':
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u;
                })
            }

        case '/users_reducer/SET_USERS':
            return {
                ...state,
                users: [...action.users] //?!  ...state.users,
            }

        case '/users_reducer/SET_CURRENT_PAGE_NUMBER':
            return {
                ...state,
                currentPageNumber: action.currentPageNumber
            }

        case '/users_reducer/SET_TOTAL_USERS_COUNT':
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }

        case '/users_reducer/TOGGLE_FETCHING':
            console.log(`isFetching = ${action.isFetching}`);
            return {
                ...state,
                isFetching: action.isFetching
            }

        case '/users_reducer/TOGGLE_FOLLOWING_PROGRESS':
            console.log(`followingProgress = ${action.followingInProgress}`);
            return {
                ...state,
                followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        default:
            return state;

    }
}

export const actions = {
    followSuccess: (userId: number) => ({ type: '/users_reducer/FOLLOW', userId } as const),
    unfollowSuccess: (userId: number) => ({ type: '/users_reducer/UNFOLLOW', userId } as const),
    setUsers: (users: Array<UserType>) => ({ type: '/users_reducer/SET_USERS', users } as const),
    setCurrentPageNumber: (currentPageNumber: number) => ({ type: '/users_reducer/SET_CURRENT_PAGE_NUMBER', currentPageNumber } as const),
    setTotalUsersCount: (totalUsersCount: number) => ({ type: '/users_reducer/SET_TOTAL_USERS_COUNT', totalUsersCount } as const),
    toggleFetching: (isFetching: boolean) => ({ type: '/users_reducer/TOGGLE_FETCHING', isFetching } as const),
    toggleFollowing: (followingInProgress: boolean, userId: number) => ({ type: '/users_reducer/TOGGLE_FOLLOWING_PROGRESS', followingInProgress, userId } as const)
}

export const getUsers = (currentPageNumber: number, pageSize: number): ThunkType => {    //  ThunkCreator
    return async (dispatch) => {

        dispatch(actions.toggleFetching(true));
        dispatch(actions.setCurrentPageNumber(currentPageNumber));

        let data = await userAPI.getUsers(currentPageNumber, pageSize);

        dispatch(actions.toggleFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
    }
}

export const unfollow = (userId: number): ThunkType => {    //  ThunkCreator
    return async (dispatch) => {

        dispatch(actions.toggleFollowing(true, userId));

        let responce = await userAPI.unfollow(userId);

        if (responce.resultCode == ResultCodesEnum.Success) {
            dispatch(actions.unfollowSuccess(userId));
        }
        dispatch(actions.toggleFollowing(false, userId));

    }
}

export const follow = (userId: number) => {    //  ThunkCreator
    return (dispatch: any) => {
        dispatch(actions.toggleFollowing(true, userId));
        userAPI.follow(userId)
            .then(responce => {
                if (responce.resultCode == ResultCodesEnum.Success) {
                    dispatch(actions.followSuccess(userId));
                }
                // sleep(5000);
                dispatch(actions.toggleFollowing(false, userId));
            });
    }
}
export default usersReducer;


type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes>;
