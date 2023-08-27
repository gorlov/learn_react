import { AppStateRedicerType } from "./redux_store";

export const getUsersList = (state:AppStateRedicerType) => {
    return state.usersPage.users;
}

export const  getPageSize = (state:AppStateRedicerType) => {
    return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state:AppStateRedicerType) => {
    return state.usersPage.totalUsersCount;
}

export const  getCurrentPageNumber = (state:AppStateRedicerType) => {
    return state.usersPage.currentPageNumber;
}

export const  getIsFetching = (state:AppStateRedicerType) => {
    return state.usersPage.isFetching;
}

export const  getFollowingInProgress = (state:AppStateRedicerType) => {
    return state.usersPage.followingInProgress;
}

export const getUsersFilter = (state:AppStateRedicerType) => {
    return state.usersPage.filter;
}