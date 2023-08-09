import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

const Users = ({ currentPageNumber, onPageChenged, totalUsersCount, pageSize, users, ...props }) => {

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