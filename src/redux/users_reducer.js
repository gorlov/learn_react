import { userAPI } from "../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE_NUMBER = 'SET-CURRENT-PAGE-NUMBER';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const TOGGLE_FETCHING = 'TOGGLE_FETCHING';
const TOGGLE_FOLLOWING_PROGRESS = 'TOGGLE_FOLLOWING_PROGRESS';


let initialState = {
    users: [],
    pageSize: 100,
    totalUsersCount: 0,
    currentPageNumber: 1,
    isFetching: false,
    followingInProgress: []
}


const usersReducer = (state = initialState, action) => {

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


export const follow = (userId) => ({ type: FOLLOW, userId });
export const unfollow = (userId) => ({ type: UNFOLLOW, userId });

export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPageNumber = (currentPageNumber) => ({ type: SET_CURRENT_PAGE_NUMBER, currentPageNumber });
export const setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount });
export const toggleFetching = (isFetching) => ({ type: TOGGLE_FETCHING, isFetching });
export const toggleFollowing = (followingInProgress, userId) => ({ type: TOGGLE_FOLLOWING_PROGRESS, followingInProgress, userId });


export const getUsers = (currentPageNumber, pageSize) => {    //  ThunkCreator
    return (dispatch) => {

        dispatch(toggleFetching(true));
        dispatch(toggleFollowing(true));

        userAPI.getUsers(currentPageNumber, pageSize).then(data => {
            console.log(data);
            dispatch(toggleFetching(false));
            dispatch(toggleFollowing(false));
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount));
        })
    }
}

export default usersReducer;