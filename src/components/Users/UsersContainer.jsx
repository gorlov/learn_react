import { connect } from "react-redux";
import { followAC, unfollowAC, setUsersAC, setCurrentPageNumberAC, setUsersTotalCountAC } from "../../redux/users_reducer";
import Users from "./Users";


let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPageNumber: state.usersPage.currentPageNumber
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followAC(userId))
        },
        unfollow: (userId) => {
            dispatch(unfollowAC(userId))
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users))
        },
        setCurrentPageNumber: (pageNumber) => {
            dispatch(setCurrentPageNumberAC(pageNumber))
        },
        setTotalUsersCount: (totalUsersCount) => {
            dispatch(setUsersTotalCountAC(totalUsersCount))
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Users);