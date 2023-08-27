import React, { useEffect } from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import { UserType } from '../../types/types';
import { useSelector } from 'react-redux';
import { getCurrentPageNumber, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsersFilter, getUsersList } from '../../redux/users-selectors';
import { useDispatch } from 'react-redux';
import { FilterType, follow, getUsers, unfollow } from '../../redux/users_reducer';
import { ThunkDispatch } from 'redux-thunk';
import { Field, Form, Formik } from 'formik';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';


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

    // const addr_str = useLocation();

    const [searchParams, setSearchParams] = useSearchParams();

    let term = searchParams.get('term')
    console.log(term);


    useEffect(() => {
        navigate(`/users?term=${filter.term}&friend=${filter.friend}&page=${currentPageNumber}`);
    }, [filter, currentPageNumber]);

    useEffect(() => {
        // debugger
        dispatch(getUsers(currentPageNumber, pageSize, filter));
    }, []);


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

const UsersSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
}

type UserSearchFormPropsType = {
    onFilterChanged: (filter: FilterType) => void
}

type FormType = {
    term: string
    friend: 'null' | 'true' | 'false'
}

const UsersSearchForm: React.FC<UserSearchFormPropsType> = (props) => {

    const onSubmit = (values: FilterType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {

        // const filter: FilterType = {
        //     term: values.term,
        //     friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        // }

        console.log(values);
        props.onFilterChanged(values);
        setSubmitting(false);

    }

    return (
        <div>
            <Formik
                initialValues={{ term: '', friend: null }}
                validate={UsersSearchFormValidate}
                onSubmit={onSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="term" />

                        <Field name="friend" as="select" >
                            <option value="null">All</option>
                            <option value="true">Only followed</option>
                            <option value="false">Only unfollowed</option>

                        </Field>

                        <button type="submit" disabled={isSubmitting}>Search</button>
                    </Form>
                )}
            </Formik>

        </div>
    )
}