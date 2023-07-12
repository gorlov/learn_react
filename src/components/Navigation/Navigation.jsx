import style from './Navigation.module.css';

const Navbar = () => {
  return (
    <nav className='nav'>
      <div><a href="#" className={style.link}>link</a></div>
      <div><a href="#" className={style.link}>link</a></div>
      <div><a href="#" className={style.link}>link</a></div>
      <div><a href="#" className={style.link}>link</a></div>
      <div><a href="#" className={style.link}>link</a></div>
      <div><a href="#" className={style.link}>link</a></div>
    </nav>
  );
}


export default Navbar;