// import img from './../../bg.jpg';
import Preloader from '../../common/preloader/Preloader';
import style from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus';
import noPhoto from '../../../assets/images/user.png';




const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />
  }

  const onPhotoSelect = (e) => {
    if(e.target.files.length) {
      props.savePhoto = e.target.files[0];
    }
  }

  return (
    <div>
      {/* <div className={style.bg}>

      </div> */}

      <div className={style.descriptionBlock}>
        <img className={style.ava} src={props.profile.photos.large || noPhoto} />
        {props.isOwner &&
          <div className={style.uploadPhoto}>
            {/* <label for="upload-photo">Browse...</label> */}
            <input type="file" id={"upload-photo"} onChange={onPhotoSelect} accept="image/png, image/jpeg" />
          </div>
        }


        <h3>{props.profile.fullName}</h3>
        <p><b>Обо мне: </b>{props.profile.aboutMe}</p>

        <ProfileStatus status={props.status} updateUserStatus={props.updateUserStatus} />

      </div>


      {/* <hr className={delimiter}/> */}
    </div>


  );
}


export default ProfileInfo;