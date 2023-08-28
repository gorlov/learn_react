import React, { useEffect } from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import { useSelector } from 'react-redux';
import { getCurrentPageNumber, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsersFilter, getUsersList } from '../../redux/users-selectors';
import { useDispatch } from 'react-redux';
import { FilterType, follow, getUsers, unfollow } from '../../redux/users_reducer';
import { ThunkDispatch } from 'redux-thunk';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UsersSearchForm } from './UserSearchForm';


function sleep(milliseconds: number) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

type PropsType = {}
type QueryParamsType = {
    term?: string
    page?: string
    friend?: string
}

export const Users: React.FC<PropsType> = (props) => {

    const dispatch: ThunkDispatch<{}, {}, any> = useDispatch();

    const users = useSelector(getUsersList)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPageNumber = useSelector(getCurrentPageNumber)
    const pageSize = useSelector(getPageSize)
    const followingInProgress = useSelector(getFollowingInProgress)
    const filter = useSelector(getUsersFilter)

    console.log(totalUsersCount);

    const onPageChanged = (pageNumber: number) => {
        console.log('onPageChanged')
        dispatch(getUsers(pageNumber, pageSize, filter));
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsers(1, pageSize, filter))
    }
    const followUser = (userId: number) => {
        console.log('follow')
        debugger
        dispatch(follow(userId))
    }
    const unfollowUser = (userId: number) => {
        console.log('unfollow')
        dispatch(unfollow(userId))
    }

    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    let urlTerm = searchParams.get('term');
    let urlFriend = searchParams.get('friend');
    let urlPage = searchParams.get('page');


    useEffect(() => {

        let actualPage = currentPageNumber;
        if (!!urlPage) actualPage = Number(urlPage);

        let actualFilter = filter;
        if (!!urlTerm) actualFilter = { ...actualFilter, term: urlTerm };

        switch (urlFriend) {
            case 'null':
                actualFilter = { ...actualFilter, friend: null };
                break;
            case 'true':
                actualFilter = { ...actualFilter, friend: true };
                break;
            case 'false':
                actualFilter = { ...actualFilter, friend: false };
                break;

        }

        dispatch(getUsers(actualPage, pageSize, actualFilter));
    }, []);

    useEffect(() => {
        const query: QueryParamsType = {};

        console.log('filter')
        console.log(filter)

        if (!!filter.term) query.term = filter.term;
        if (filter.friend !== null) query.friend = String(filter.friend);
        if (currentPageNumber !== 1) query.page = String(currentPageNumber);

        console.log('query')
        console.log(query)

        setSearchParams(query);

        // navigate(`/users?term=${filter.term}&friend=${filter.friend}&page=${currentPageNumber}`);
    }, [filter, currentPageNumber]);

    // let pagesCnt = Math.ceil(totalUsersCount / pageSize);

    return (
        <div>
            <Paginator
                currentPageNumber={currentPageNumber}
                onPageChenged={onPageChanged}
                totalUsersCount={totalUsersCount}
                pageSize={pageSize}
            // pagesCount={pagesCnt}
            />

            <UsersSearchForm onFilterChanged={onFilterChanged} />

            {
                users.map(u => <User
                    user={u}
                    followingInProgress={followingInProgress}
                    unfollow={unfollowUser}
                    follow={followUser}
                />
                )
            }

        </div>
    )
}

