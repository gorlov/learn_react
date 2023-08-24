import React from 'react';
import { actions } from '../../../redux/profile_reducer'
import MyPosts, { MyPostsDispatchPropsType, MyPostsMapPropsType } from './MyPosts';
import { connect } from 'react-redux';
import { AppStateRedicerType } from '../../../redux/redux_store';
import { PostType } from '../../../types/types';


let mapStateToProps = (state:AppStateRedicerType) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText
  }
}

// let mapDispatchToProps = (dispatch) => {
//   return {
//     addPost: (newPostElement) => {
//       dispatch(actions.addPostActionCreator(newPostElement));
//     }
//   }
// }


const MyPostsContainer = connect<MyPostsMapPropsType, MyPostsDispatchPropsType, {}, AppStateRedicerType>(mapStateToProps, {
  addPost: actions.addPostActionCreator
})(MyPosts);


export default MyPostsContainer;
