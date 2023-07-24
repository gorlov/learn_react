import { NavLink } from 'react-router-dom';
import logo from './../../xox.svg';
import style from './Header.module.css';

const Header = (props) => {
    return (
        <header className='header'>
            <img src={logo} className={style.logo} alt="logo" />

            <div className={style.loginBlock}>
                { props.isAuth ? <p>{props.login}</p> :
                <NavLink to={'/login'} >Login</NavLink> }
            </div>
        </header>
    );
}


export default Header;