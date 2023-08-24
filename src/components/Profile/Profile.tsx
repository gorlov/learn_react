import { ProfileType } from '../../types/types';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';

type PropsType = {
  profile: ProfileType | null
  status: string
  updateUserStatus: (status: string) => void
  isOwner: boolean
  savePhoto: (file: File) => void
}

const Profile:React.FC<PropsType> = (props) => {
  console.log('Profile.js')
  console.log(props)
  return (
    <div>

      <ProfileInfo savePhoto={props.savePhoto} isOwner={props.isOwner} profile={props.profile} status={props.status} updateUserStatus={props.updateUserStatus}/>

      <MyPostsContainer />

    </div>

  );
}


export default Profile;