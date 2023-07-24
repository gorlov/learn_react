import React from "react";
import { connect } from "react-redux";
import axios from 'axios';

import { follow, unfollow, setUsers, setCurrentPageNumber, setTotalUsersCount, toggleFetching } from "../../redux/users_reducer";
import Users from './Users';
import Preloader from "../common/preloader/Preloader";

class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.toggleFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPageNumber}&count=${this.props.pageSize}`)
            .then(responce => {
                this.props.toggleFetching(false);
                this.props.setUsers(responce.data.items);
                this.props.setTotalUsersCount(responce.data.totalCount);
            })
    }

    onPageChenged = (pageNumber) => {
        this.props.setCurrentPageNumber(pageNumber)
        this.props.toggleFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(responce => {
                this.props.toggleFetching(false);
                this.props.setUsers(responce.data.items);
            })
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
        isFetching: state.usersPage.isFetching
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
    follow, unfollow, setUsers, setCurrentPageNumber, setTotalUsersCount, toggleFetching
})(UsersContainer);