import { NavLink } from 'react-router-dom';

import noPhoto from '../../assets/images/user.png';
import style from './Users.module.css';

let User = ({ user, followingInProgress, unfollow, follow }) => {

    return (
        <div key={user.id} >
            <span>
                <div>
                    <NavLink to={'/profile/' + user.id} >
                        <img src={user.photos.large != null ? user.photos.large : noPhoto} className={style.userPhoto} />
                    </NavLink>
                </div>
                <div>
                    {user.followed
                        ? <button disabled={followingInProgress.some(id => id === user.id)}
                            className={style.followButton}
                            onClick={() => { unfollow(user.id) }}>unfollow</button>
                        : <button disabled={followingInProgress.some(id => id === user.id)}
                            className={style.followButton}
                            onClick={() => { follow(user.id) }}>follow</button>
                    }
                </div>
            </span>
            <span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
                <span>
                    <div>{'u.location.country'}</div>
                    <div>{'u.location.city'}</div>
                </span>
            </span>
        </div>
    )
}
    

export default User;