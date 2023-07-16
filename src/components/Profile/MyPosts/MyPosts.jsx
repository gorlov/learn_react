import React from 'react';
import style from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {


  let postData = props.posts;

  let posts = postData.map(p => <Post message={p.post} likesCount={p.likesCount} />)

  let newPostElement = React.createRef();
  
  let addPost = () => {
    // props.addPost();
    props.dispatch({type: 'ADD-POST'})
    props.dispatch({type: 'UPDATE-NEW-POST', newText: ''})
  };

  let onPostChange = () => {
    let text = newPostElement.current.value;
    // props.updateNewPostText(text);
    props.dispatch({type: 'UPDATE-NEW-POST', newText: text})
    console.log(text);
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

        {posts}

      </div>
    </div>

  );
}


export default MyPosts;