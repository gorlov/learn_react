import { NavLink } from 'react-router-dom';
import axios from 'axios';

import noPhoto from '../../assets/images/user.png';
import style from './Users.module.css';
import { userAPI } from '../../api/api';

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

let Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            <div>
                {pages.map(p => {
                    return <span className={props.currentPageNumber === p ? style.selectedPage : style.pageButton}
                        onClick={(e) => { props.onPageChenged(p) }}>{p}</span>
                })}
            </div>
            {
                props.users.map(u => <div key={u.id} >
                    <span>
                        <div>
                            <NavLink to={'/profile/' + u.id} >
                                <img src={u.photos.large != null ? u.photos.large : noPhoto} className={style.userPhoto} />
                            </NavLink>
                        </div>
                        <div>
                            {u.followed
                                ? <button disabled={props.followingInProgress.some(id => id === u.id)}
                                    className={style.followButton}
                                    onClick={() => { props.unfollow(u.id) }}>unfollow</button>
                                : <button disabled={props.followingInProgress.some(id => id === u.id)}
                                    className={style.followButton}
                                    onClick={() => { props.follow(u.id) }}>follow</button>
                            }
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{'u.location.country'}</div>
                            <div>{'u.location.city'}</div>
                        </span>
                    </span>
                </div>)
            }
        </div>
    )
}

export default Users;