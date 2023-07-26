import React from "react";
import { connect } from "react-redux";
import axios from 'axios';


import { follow, unfollow, setUsers, setCurrentPageNumber, setTotalUsersCount, toggleFetching, toggleFollowing, getUsers } from "../../redux/users_reducer";
import Users from './Users';
import Preloader from "../common/preloader/Preloader";
import { userAPI } from "../../api/api";


class UsersContainer extends React.Component {

    componentDidMount() {

        this.props.getUsers(this.props.currentPageNumber, this.props.pageSize);
        
    }

    onPageChenged = (pageNumber) => {

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
                    toggleFollowing={this.props.toggleFollowing}
                    followingInProgress={this.props.followingInProgress}
                /> 
        }
            </>)
    }
}


let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPageNumber: state.usersPage.currentPageNumber,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}

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

export default connect(mapStateToProps, {
    follow, unfollow,  
    setCurrentPageNumber, setTotalUsersCount, 
    toggleFollowing, getUsers 
})(UsersContainer);