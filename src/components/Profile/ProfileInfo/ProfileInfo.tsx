// import img from './../../bg.jpg';
import Preloader from '../../common/preloader/Preloader';
import style from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus';
import noPhoto from '../../../assets/images/user.png';
import { ProfileType } from '../../../types/types';
import React, { ChangeEvent, ChangeEventHandler } from 'react';

type PropsType = {
  profile: ProfileType | null
  status: string
  updateUserStatus: (status: string) => void
  isOwner: boolean
  savePhoto: (file: File) => void
}


const ProfileInfo:React.FC<PropsType> = (props) => {
  if (!props.profile) {
    return <Preloader />
  }

  const onPhotoSelect = (e:ChangeEvent<HTMLInputElement>) => {
    if(e.target.files?.length) {
      props.savePhoto(e.target.files[0]);
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
            <label htmlFor="upload-photo">Browse...</label>
            <input type="file" id="upload-photo" onChange={onPhotoSelect} />
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