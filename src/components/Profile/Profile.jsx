import img from './../../bg.jpg';
import MyPosts from './MyPosts/MyPosts';
import style from './Profile.module.css';

const Profile = () => {
  return (
    <div className='content'>
      <div className={style.bg}> 
        {/* <img src={img} alt="kartinka ;-)" width="50%" /> */}
      </div>
      <div>ava</div>
      
      <MyPosts />

    </div>

  );
}


export default Profile;