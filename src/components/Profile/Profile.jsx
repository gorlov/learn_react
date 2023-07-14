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

      <MyPosts posts={props.state.posts} addPost={props.addPost}/>

    </div>

  );
}


export default Profile;