import img from '../../face_1.png';
import style from './Users.module.css';


const Users = (props) => {
debugger
    return (
        <div>{
            props.users.map(u => <div key={u.id} >
                <span>
                    <div><img src={img} className={style.userPhoto} /></div>
                    <div>
                        {u.followed ? <button className={style.followButton} onClick={() => {props.unfollow(u.id)}}>unfollow</button> : <button className={style.followButton} onClick={() => {props.follow(u.id)}}>follow</button>}
                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.fullName}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{u.location.country}</div>
                        <div>{u.location.city}</div>
                    </span>
                </span>





            </div>)










        }
        </div>
    )

}


export default Users;