import React from 'react';
import { updateNewPostTextActionCreator, addPostActionCreator } from '../../../redux/profile_reducer'
import MyPosts from './MyPosts';
import { connect } from 'react-redux';


// const MyPostsContainer = () => {

//   return (
//     <StoreContext.Consumer> 
//       {
//       (store) => {
//         let state = store.getState();

//         let addPost = () => {
//           store.dispatch(addPostActionCreator());
//         };

//         let onPostChange = (text) => {
//           let action = updateNewPostTextActionCreator(text);
//           store.dispatch(action);
//         };
//         return <MyPosts
//           updateNewPostText={onPostChange}
//           addPost={addPost}
//           posts={state.profilePage.posts}
//           newPostText={state.profilePage.newPostText}
//         />
//       }
//     }</StoreContext.Consumer>
//   );
// }

let mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    updateNewPostText: (text) => {
      dispatch(updateNewPostTextActionCreator(text));
    },
    addPost: () => {
      dispatch(addPostActionCreator());
    }
  }
}


const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);


export default MyPostsContainer;