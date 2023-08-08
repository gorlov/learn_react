
import Paginator from '../common/Paginator/Paginator';
import User from './User';

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

let Users = ({currentPageNumber, onPageChenged, totalUsersCount, pageSize, users, ...props}) => {

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
                    user                  = {u}
                    followingInProgress   = {props.followingInProgress}
                    unfollow              = {props.unfollow}
                    follow                = {props.follow}
                />
                
                
                // <div key={u.id} >
                //     <span>
                //         <div>
                //             <NavLink to={'/profile/' + u.id} >
                //                 <img src={u.photos.large != null ? u.photos.large : noPhoto} className={style.userPhoto} />
                //             </NavLink>
                //         </div>
                //         <div>
                //             {u.followed
                //                 ? <button disabled={props.followingInProgress.some(id => id === u.id)}
                //                     className={style.followButton}
                //                     onClick={() => { props.unfollow(u.id) }}>unfollow</button>
                //                 : <button disabled={props.followingInProgress.some(id => id === u.id)}
                //                     className={style.followButton}
                //                     onClick={() => { props.follow(u.id) }}>follow</button>
                //             }
                //         </div>
                //     </span>
                //     <span>
                //         <span>
                //             <div>{u.name}</div>
                //             <div>{u.status}</div>
                //         </span>
                //         <span>
                //             <div>{'u.location.country'}</div>
                //             <div>{'u.location.city'}</div>
                //         </span>
                //     </span>
                // </div>
                )
            }
        </div>
    )
}

export default Users;