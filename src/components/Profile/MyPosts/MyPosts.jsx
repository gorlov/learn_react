import React from 'react';
import style from './MyPosts.module.css';
import Post from './Post/Post';
import {updateNewPostTextActionCreator, addPostActionCreator} from '../../../redux/profile_reducer'


const MyPosts = (props) => {

  let postsElements = props.posts.map(p => <Post message={p.post} likesCount={p.likesCount} />)

  let newPostElement = React.createRef();
  
  let addPost = () => {
    props.addPost();
  };

  let onPostChange = () => {
    let text = newPostElement.current.value;
    props.updateNewPostText(text);
  };

  return (
    <div>
      <div>
        <h3>New post</h3>
        <div>
          <textarea ref={newPostElement} onChange={onPostChange} value={props.newPostText} />
          <div>
            <button onClick={addPost}>Send post</button>
          </div>
        </div>

      </div>
      <div>
        <h3 className={style.header}>Posts</h3>

        {postsElements}

      </div>
    </div>

  );
}


export default MyPosts;