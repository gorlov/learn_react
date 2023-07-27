// import img from './../../bg.jpg';
import Preloader from '../../common/preloader/Preloader';
import style from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus';

const ProfileInfo = (props) => {

  if (!props.profile) {
    <Preloader />
  } else return (
    <div>
      {/* <div className={style.bg}>

      </div> */}

      <div className={style.descriptionBlock}>
        <img src={props.profile.photos.small} />

        <h3>{props.profile.fullName}</h3>
        <p><b>Обо мне: </b>{props.profile.aboutMe}</p>

        <ProfileStatus />

      </div>


      {/* <hr className={delimiter}/> */}
    </div>


  );
}


export default ProfileInfo;