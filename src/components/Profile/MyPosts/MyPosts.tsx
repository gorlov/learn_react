import React from 'react';
import style from './MyPosts.module.css';
import Post from './Post/Post';
import { requiredField, maxLengthCreator } from '../../../utils/validators/validators'
import { Textarea, createField } from '../../common/FormsControls/FormsControls';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { PostType } from '../../../types/types';

export type MyPostsMapPropsType = {
  posts: Array<PostType>
}

export type MyPostsDispatchPropsType = {
  addPost: (newPostElement:string) => void
}


const MyPosts:React.FC<MyPostsMapPropsType & MyPostsDispatchPropsType> = (props) => {

  let postsElements = props.posts.map(p => <Post id={p.id} post={p.post} likesCount={p.likesCount} />)

  let addNewPost = (values:ProfilePostFormType) => {
    console.log(values);
    props.addPost(values.newPostElement);
  }

  return (
    <div>
      <div>
        <h3>New post</h3>
        <ProfilePostReduxForm onSubmit={addNewPost} />
      </div>

      <div>
        <h3 className={style.header}>Posts</h3>
        {postsElements}
      </div>
    </div>

  );
}


type ProfilePostFormPropsType = {}

export type ProfilePostFormType = {
  newPostElement: string
}

type ProfilePostFormValuesKeysType = Extract<keyof ProfilePostFormType, string>

const ProfilePostForm: React.FC<InjectedFormProps<ProfilePostFormType, ProfilePostFormPropsType> & ProfilePostFormPropsType> = (props) => {

  return (

    <form onSubmit={props.handleSubmit}>

      {createField<ProfilePostFormValuesKeysType>('29634', 'newPostElement', [requiredField], Textarea)}

      {/* <Field placeholder={'29634'} name={'newPostElement'} component={Textarea} validate={[requiredField]} /> */}

      {/* <Field placeholder={'29634'} name={'newPostElement'} component={Textarea} /> */}


      <div>
        <button>Send post</button>
      </div>
    </form>
  )

}

const ProfilePostReduxForm = reduxForm<ProfilePostFormType, ProfilePostFormPropsType>({ form: 'profilePostForm' })(ProfilePostForm);


export default MyPosts;