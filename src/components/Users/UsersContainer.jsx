import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";


import { follow, unfollow, setCurrentPageNumber, setTotalUsersCount, toggleFollowing, getUsers } from "../../redux/users_reducer";
import Users from './Users';
import Preloader from "../common/preloader/Preloader";

import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { getUsersList, getCurrentPageNumber, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount } from "../../redux/users-selectors";



class UsersContainer extends React.Component {

    componentDidMount() {

        this.props.getUsers(this.props.currentPageNumber, this.props.pageSize);
        
    }

    onPageChenged = (pageNumber) => {
        // this.props.setCurrentPage(pageNumber);
        this.props.getUsers(pageNumber, this.props.pageSize);
        
    }

    render() {
        return (
            <>
                { this.props.isFetching === true ? <Preloader /> : 
                <Users
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    users={this.props.users}
                    currentPageNumber={this.props.currentPageNumber}
                    onPageChenged={this.onPageChenged}
                    unfollow={this.props.unfollow}
                    follow={this.props.follow}
                    followingInProgress={this.props.followingInProgress}
                /> 
        }
            </>)
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsersList(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPageNumber: getCurrentPageNumber(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}


// let mapStateToProps = (state) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPageNumber: state.usersPage.currentPageNumber,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress
//     }
// }

// let mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (userId) => {
//             dispatch(followAC(userId))
//         },
//         unfollow: (userId) => {
//             dispatch(unfollowAC(userId))
//         },
//         setUsers: (users) => {
//             dispatch(setUsersAC(users))
//         },
//         setCurrentPageNumber: (pageNumber) => {
//             dispatch(setCurrentPageNumberAC(pageNumber))
//         },
//         setTotalUsersCount: (totalUsersCount) => {
//             dispatch(setUsersTotalCountAC(totalUsersCount))
//         },
//         toggleFetching: (isFitching) => {
//             dispatch(toggleFetchingAC(isFitching))
//         }
//     }

// }

export default compose(
    // withAuthRedirect,
    connect(mapStateToProps, {follow, unfollow, setCurrentPageNumber, setTotalUsersCount, toggleFollowing, getUsers})
)(UsersContainer);