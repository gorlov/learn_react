import style from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {
 
  
  let postData = props.posts;

  let posts = postData.map( p => <Post message={p.post} likesCount={p.likesCount}/>)

  return (
    <div>
      <div>New post</div>
      <div>
        <h3 className={style.header}>Posts</h3>

        { posts }
      
      </div>
    </div>

  );
}


export default MyPosts;