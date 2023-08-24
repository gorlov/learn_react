import { NavLink } from 'react-router-dom';
import logo from './../../xox.svg';
import style from './Header.module.css';

export type HeaderMapPropsType = {
    isAuth: boolean
    login: string | null
}

export type HeaderDispatchPropsType = {
    logout: () => void
}

const Header:React.FC<HeaderMapPropsType & HeaderDispatchPropsType> = (props) => {
    return (
        <header className='header'>
            <img src={logo} className={style.logo} alt="logo" />

            <div className={style.loginBlock}>
                { props.isAuth 
                ?<p>{props.login} - <button onClick={props.logout}>Logout</button> </p> 
                // ?<p>{props.login} - <a onClick={props.logout}>Logout</a> </p> 

                :<NavLink to={'/login'} >Login</NavLink> }
            </div>
        </header>
    );
}


export default Header;