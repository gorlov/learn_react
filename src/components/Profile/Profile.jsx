import img from './../../bg.jpg';
import MyPosts from './MyPosts/MyPosts';
import style from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = (props) => {
  console.log('Profile.js')
  console.log(props)
  return (
    <div>

      <ProfileInfo />

      <MyPosts posts={props.profilePage.posts} newPostText={props.profilePage.newPostText} dispatch={props.dispatch} />

    </div>

  );
}


export default Profile;