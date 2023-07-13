import { NavLink } from 'react-router-dom';
import style from './Navigation.module.css';

const Navbar = () => {
  return (
    <nav className='nav'>
      <div className={style.item}><NavLink exact to="/profile" activeClassName={style.linkactive}>Profile</NavLink></div>
      <div className={style.item}><NavLink to="/dialogs" activeClassName={style.linkactive}>Dialogs</NavLink></div>
      <div className={style.item}><NavLink to="#" className={style.link} activeClassName="activeLink" >link</NavLink></div>
      <div className={style.item}><NavLink to="#" className={style.link}>link</NavLink></div>
      <div className={style.item}><NavLink to="#" className={style.link}>link</NavLink></div>
      <div className={style.item}><NavLink to="#" className={style.link}>link</NavLink></div>
    </nav>
  );
}


export default Navbar;