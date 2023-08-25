import React, { useEffect } from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import { UserType } from '../../types/types';
import { useSelector } from 'react-redux';
import { getCurrentPageNumber, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsersList } from '../../redux/users-selectors';
import { useDispatch } from 'react-redux';
import { getUsers } from '../../redux/users_reducer';
import { ThunkDispatch } from 'redux-thunk';

function sleep(milliseconds: number) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

type PropsType = {}

export const Users: React.FC<PropsType> = (props) => {

    const dispatch: ThunkDispatch<{}, {}, any> = useDispatch();

    const users = useSelector(getUsersList)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPageNumber = useSelector(getCurrentPageNumber)
    const pageSize = useSelector(getPageSize)
    const followingInProgress = useSelector(getFollowingInProgress)

    console.log(totalUsersCount);

    const onPageChanged = (pageNumber: number) => {
        console.log('onPageChanged')
        dispatch(getUsers(pageNumber, pageSize));
    }
    const follow = (userId: number) => {
        console.log('follow')
        dispatch(follow(userId))
    }
    const unfollow = (userId: number) => {
        console.log('unfollow')
        dispatch(unfollow(userId))
    }

    useEffect(() => {
        // debugger
        dispatch(getUsers(currentPageNumber, pageSize));
    }, []);

    return (
        <div>
            <Paginator
                currentPageNumber={currentPageNumber}
                onPageChenged={onPageChanged}
                totalUsersCount={totalUsersCount}
                pageSize={pageSize}
            />

            {
                users.map(u => <User
                    user={u}
                    followingInProgress={followingInProgress}
                    unfollow={unfollow}
                    follow={follow}
                />
                )
            }

        </div>
    )
}