import React from 'react';
import { actions } from '../../../redux/profile_reducer'
import MyPosts, { MyPostsDispatchType, MyPostsPropsType } from './MyPosts';
import { connect } from 'react-redux';
import { AppStateRedicerType } from '../../../redux/redux_store';
import { PostType } from '../../../types/types';


let mapStateToProps = (state: AppStateRedicerType) => {
  return {
    posts: state.profilePage.posts,
    // newPostText: state.profilePage.newPostText
  }
}

const MyPostsContainer = connect<MyPostsPropsType, MyPostsDispatchType, {}, AppStateRedicerType>(mapStateToProps, {
  addPost: actions.addPostActionCreator
})(MyPosts);


export default MyPostsContainer;

type MapDispatchToPropsType = {
  addPost: (newPostElement: PostType) => void
}