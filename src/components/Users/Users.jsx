import { NavLink } from 'react-router-dom';
import axios from 'axios';

import noPhoto from '../../assets/images/user.png';
import style from './Users.module.css';

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

    console.log('props = ');
    console.log(props);

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
                                <img src={u.photos.small != null ? u.photos.small : noPhoto} className={style.userPhoto} />
                            </NavLink>
                        </div>
                        <div>
                            {u.followed
                                ? <button disabled={props.followingInProgress.some(id => id === u.id)} className={style.followButton} onClick={() => {
                                    props.toggleFollowing(true, u.id);
                                    axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                        withCredentials: true,
                                        headers: { "API-KEY": "d345afdd-f938-4cd0-b8a4-5aeea504e6a2" }
                                    })
                                        .then(responce => {
                                            if (responce.data.resultCode == 0) {
                                                props.unfollow(u.id);
                                            }
                                            // sleep(5000);
                                            props.toggleFollowing(false, u.id);
                                        });
                                }}>unfollow</button>
                                : <button disabled={props.followingInProgress.some(id => id === u.id)} className={style.followButton} onClick={() => {
                                    props.toggleFollowing(true, u.id);
                                    axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                        withCredentials: true,
                                        headers: { "API-KEY": "d345afdd-f938-4cd0-b8a4-5aeea504e6a2" }
                                    })
                                        .then(responce => {
                                            if (responce.data.resultCode == 0) {
                                                props.follow(u.id);
                                            }
                                            // sleep(5000);
                                            props.toggleFollowing(false, u.id);
                                        });
                                }}>follow</button>}
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