import { userAPI } from "../api/api";
import { PostType, ProfileType, PhotosType, ContactsType, UserType } from "../types/types"


const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE_NUMBER = 'SET-CURRENT-PAGE-NUMBER';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const TOGGLE_FETCHING = 'TOGGLE_FETCHING';
const TOGGLE_FOLLOWING_PROGRESS = 'TOGGLE_FOLLOWING_PROGRESS';



let initialState = {
    users: [] as Array<UserType>,
    pageSize: 100,
    totalUsersCount: 0,
    currentPageNumber: 1,
    isFetching: false,
    followingInProgress: [] as Array<number> // array of users id's
}

type InitialStateType = typeof initialState;

const usersReducer = (state = initialState, action:any):InitialStateType => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    }
                    return u;
                })
            }

        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u;
                })
            }

        case SET_USERS:
            return {
                ...state,
                users: [...action.users] //?!  ...state.users,
            }

        case SET_CURRENT_PAGE_NUMBER:
            return {
                ...state,
                currentPageNumber: action.currentPageNumber
            }

        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }

        case TOGGLE_FETCHING:
            console.log(`isFetching = ${action.isFetching}`);
            return {
                ...state,
                isFetching: action.isFetching
            }

        case TOGGLE_FOLLOWING_PROGRESS:
            console.log(`followingProgress = ${action.followingProgress}`);
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

type FollowSuccessActionType = {
    type: typeof FOLLOW
    userId: number
}
type UnFollowSuccessActionType = {
    type: typeof UNFOLLOW
    userId: number
}
type SetUsersActionType = {
    type: typeof SET_USERS
    users:Array<UserType>
}
type SetCurrentPageNumberActionType = {
    type: typeof SET_CURRENT_PAGE_NUMBER
    currentPageNumber:number
}
type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalUsersCount: number
}
type ToggleFetchingActionType = {
    type: typeof TOGGLE_FETCHING
    isFetching: boolean
}
type ToggleFollowingActionType = {
    type: typeof TOGGLE_FOLLOWING_PROGRESS
    followingInProgress: boolean
    userId: number
}

export const followSuccess = (userId:number):FollowSuccessActionType => ({ type: FOLLOW, userId });
export const unfollowSuccess = (userId:number):UnFollowSuccessActionType => ({ type: UNFOLLOW, userId });

export const setUsers = (users:Array<UserType>):SetUsersActionType => ({ type: SET_USERS, users });
export const setCurrentPageNumber = (currentPageNumber:number):SetCurrentPageNumberActionType => ({ type: SET_CURRENT_PAGE_NUMBER, currentPageNumber });
export const setTotalUsersCount = (totalUsersCount:number):SetTotalUsersCountActionType => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount });
export const toggleFetching = (isFetching:boolean):ToggleFetchingActionType => ({ type: TOGGLE_FETCHING, isFetching });
export const toggleFollowing = (followingInProgress:boolean, userId:number):ToggleFollowingActionType => ({ type: TOGGLE_FOLLOWING_PROGRESS, followingInProgress, userId });


export const getUsers = (currentPageNumber:number, pageSize:number) => {    //  ThunkCreator
    return (dispatch:any) => {

        dispatch(toggleFetching(true));
        dispatch(setCurrentPageNumber(currentPageNumber));

        userAPI.getUsers(currentPageNumber, pageSize).then(data => {
            console.log(data);
            dispatch(toggleFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount));
            
        })
    }
}


export const unfollow = (userId:number) => {    //  ThunkCreator
    return (dispatch:any) => {

        dispatch(toggleFollowing(true, userId));
        userAPI.unfollow(userId)
            .then(responce => {
                if (responce.data.resultCode == 0) {
                    dispatch(unfollowSuccess(userId));
                }
                // sleep(5000);
                dispatch(toggleFollowing(false, userId));
            });
    }
}

export const follow = (userId:number) => {    //  ThunkCreator
    return (dispatch:any) => {
        dispatch(toggleFollowing(true, userId));
        userAPI.follow(userId)
            .then(responce => {
                if (responce.data.resultCode == 0) {
                    dispatch(followSuccess(userId));
                }
                // sleep(5000);
                dispatch(toggleFollowing(false, userId));
            });
    }
}
export default usersReducer;