import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';

type ProfileType = ReturnType<typeof 

const Profile = (props) => {
  console.log('Profile.js')
  console.log(props)
  return (
    <div>

      <ProfileInfo 
      savePhoto={props.savePhoto} 
      isOwner={props.isOwner} 
      profile={props.profile} 
      status={props.status} 
      updateUserStatus={props.updateUserStatus}/>

      <MyPostsContainer />

    </div>

  );
}


export default Profile;