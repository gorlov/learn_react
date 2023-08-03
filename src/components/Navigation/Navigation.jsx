import { NavLink } from 'react-router-dom';
import style from './Navigation.module.css';

console.log(style);

const Navbar = () => {

  return (
    <nav className='nav'>

      <div className={style.item}><NavLink to="/profile" className={({isActive, isPending}) => isActive ? style.active : ""}>Profile</NavLink></div>

      <div className={style.item}><NavLink to="/dialogs" className={({isActive, isPending}) => isActive ? style.active : ""}>Dialogs</NavLink></div>
      
      <div className={style.item}><NavLink to="/users" className={({isActive, isPending}) => isActive ? style.active : ""}>Users</NavLink></div>
      
      <div className={style.item}><NavLink to="#" className={style.link}>link</NavLink></div>
      <div className={style.item}><NavLink to="#" className={style.link}>link</NavLink></div>
      
      <div className={style.item}><NavLink to="/ignlogs" className={({isActive, isPending}) => isActive ? style.active : ""}>logs</NavLink></div>

      <div className={style.copyleft}>🄯</div>
    </nav>
  );
}


export default Navbar;