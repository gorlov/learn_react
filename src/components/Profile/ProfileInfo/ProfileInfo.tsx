// import img from './../../bg.jpg';
import Preloader from '../../common/preloader/Preloader';
import style from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus';
import noPhoto from '../../../assets/images/user.png';

import { ProfileType } from '../../../types/types';
import { ChangeEvent } from 'react';

type PropfileInfoType = {
  profile: ProfileType
  status: string
  updateStatus: (status:string) => void
  isOwner: boolean
  savePhoto: (file:File) => void
}

const ProfileInfo:React.FC<PropfileInfoType> = ({ profile, status, updateStatus, isOwner, savePhoto }) => {
  if (!profile) {
    return <Preloader />
  }

  const onPhotoSelect = (e:ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      savePhoto(e.target.files[0]);
    }
  }

  return (
    <div>

      <div className={style.descriptionBlock}>
        <img className={style.ava} src={profile.photos.large || noPhoto} />
        {isOwner &&
          <div className={style.uploadPhoto}>
            <label htmlFor="upload-photo">Browse...</label>
            <input type="file" id="upload-photo" onChange={onPhotoSelect} />
          </div>
        }

        <h3>{profile.fullName}</h3>
        <p><b>Обо мне: </b>{profile.aboutMe}</p>

        <ProfileStatus status={status} updateUserStatus={updateStatus} />

      </div>

    </div>

  );
}


export default ProfileInfo;