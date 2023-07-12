import logo from './../../logo.svg';
import style from './Header.module.css';

const Header = () => {
    return (
        <header className='header'>
            <img src={logo} className={style.logo} alt="logo" />
        </header>
    );
}


export default Header;