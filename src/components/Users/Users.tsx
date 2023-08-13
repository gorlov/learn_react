import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import { UserType } from '../../types/types';

function sleep(milliseconds: number) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

type PropsType = {
    currentPageNumber: number
    onPageChenged: (pageNumber:number) => void
    totalUsersCount: number
    pageSize:number
    users: Array<UserType>
    followingInProgress: Array<number>
    unfollow: (userId:number) => void
    follow: (userId:number) => void
}

const Users:React.FC<PropsType> = ({ currentPageNumber, onPageChenged, totalUsersCount, pageSize, users, ...props }) => {

    return (
        <div>
            <Paginator
                currentPageNumber={currentPageNumber}
                onPageChenged={onPageChenged}
                totalUsersCount={totalUsersCount}
                pageSize={pageSize}
            />


            {
                users.map(u => <User
                    user={u}
                    followingInProgress={props.followingInProgress}
                    unfollow={props.unfollow}
                    follow={props.follow}
                />
                )
            }

        </div>
    )
}

export default React.memo(Users);