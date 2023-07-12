import style from './Navigation.module.css';

const Navbar = () => {
  return (
    <nav className='nav'>
      <div className={style.item}><a href="#" className={style.link}>link</a></div>
      <div className={style.item}><a href="#" className={style.link}>link</a></div>
      <div className={style.item}><a href="#" className={style.link}>link</a></div>
      <div className={style.item}><a href="#" className={style.link}>link</a></div>
      <div className={style.item}><a href="#" className={style.link}>link</a></div>
      <div className={style.item}><a href="#" className={style.link}>link</a></div>
    </nav>
  );
}


export default Navbar;