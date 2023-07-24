// import img from './../../bg.jpg';
import Preloader from '../../common/preloader/Preloader';
import style from './ProfileInfo.module.css';

const ProfileInfo = (props) => {

  if (!props.profile) {
    <Preloader />
  } else return (
    <div>
      <div className={style.bg}>
        {/* <img src={img} alt="kartinka ;-)" width="50%" /> */}
      </div>

      <div className={style.descriptionBlock}>
        <img src={props.profile.photos.small} />

        <h3>{props.profile.fullName}</h3>
        <p><b>Обо мне: </b>{props.profile.aboutMe}</p>
      </div>


      <hr />
    </div>


  );
}


export default ProfileInfo;