import React from 'react';
import axios from 'axios';
import noPhoto from '../../assets/images/user.png';
import style from './Users.module.css';

class Users extends React.Component {

    componentDidMount() {

        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPageNumber}&count=${this.props.pageSize}`)
        .then(responce => {
            this.props.setUsers(responce.data.items);
            this.props.setTotalUsersCount(responce.data.totalCount);
        })
    }

    onPageChenged = (pageNumber) => {
        this.props.setCurrentPageNumber(pageNumber)

        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
        .then(responce => {
            this.props.setUsers(responce.data.items);
        })
    }

    render() {

        console.log('users render props');
        console.log(this.props);

        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);

        let pages = [];

        for (let i = 1; i <= pagesCount; i++) {
            console.log(`i = ${i}`);
            pages.push(i);
        }

        console.log('pages = ');
        console.log(pages);
        console.log(pagesCount);

        return (
            <div>
                <div>
                    { pages.map( p => {
                        return  <span className={this.props.currentPageNumber === p ? style.selectedPage : style.pageButton}
                        onClick={ (e) => { this.onPageChenged(p)}}>{p}</span>
                    })}
                </div>
                {
                    this.props.users.map(u => <div key={u.id} >
                        <span>
                            <div><img src={u.photos.small != null ? u.photos.small : noPhoto} className={style.userPhoto} /></div>
                            <div>
                                {u.followed
                                    ? <button className={style.followButton} onClick={() => { this.props.unfollow(u.id) }}>unfollow</button>
                                    : <button className={style.followButton} onClick={() => { this.props.follow(u.id) }}>follow</button>}
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
}


export default Users;