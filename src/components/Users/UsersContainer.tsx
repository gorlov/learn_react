import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";


import { follow, unfollow,  getUsers } from "../../redux/users_reducer";
import Users from './Users';
import Preloader from "../common/preloader/Preloader";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { getUsersList, getCurrentPageNumber, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount } from "../../redux/users-selectors";
import { UserType } from "../../types/types";
import { AppStateRedicerType } from "../../redux/redux_store";

type MapStatePropsType = {
    currentPageNumber: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UserType>
    followingInProgress: Array<number>
}

type MapDispatchPropsType = {
    // onPageChenged: () => void
    unfollow: (userId:number) => void
    follow: (userId:number) => void
    getUsers: (currentPageNumber: number, pageSize: number) => void
    // setCurrentPageNumber:
    // setTotalUsersCount:
    // toggleFollowing:
}

type OwnProps = {
    pageTytle: string
}


type PropsType = MapStatePropsType & MapDispatchPropsType & OwnProps

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        console.log('getting users');
        this.props.getUsers(this.props.currentPageNumber, this.props.pageSize);

    }

    onPageChenged = (pageNumber: number) => {
        // this.props.setCurrentPage(pageNumber);
        this.props.getUsers(pageNumber, this.props.pageSize);

    }

    shouldComponentUpdate(nextProps: PropsType, nextState: AppStateRedicerType) {
        return nextProps != this.props || nextState != this.state;
    }

    render() {
        console.log('render users');
        return (
            <>
                {this.props.isFetching === true ? <Preloader /> :
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

let mapStateToProps = (state: AppStateRedicerType) => {
    return {
        users: getUsersList(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPageNumber: getCurrentPageNumber(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

//  <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>

export default compose(
    // withAuthRedirect,
    connect<MapStatePropsType, MapDispatchPropsType, OwnProps, AppStateRedicerType>(
        mapStateToProps, { follow, unfollow,  getUsers })
)(UsersContainer);

// какие-то коллбэки
// setCurrentPageNumber, setTotalUsersCount, toggleFollowing,