import React from 'react';
import style from './MyPosts.module.css';
import Post from './Post/Post';
import { Field, reduxForm } from 'redux-form';
import {requiredField, maxLengthCreator} from '../../../utils/validators/validators'
import { Textarea } from '../../common/FormsControls/FormsControls';


const MyPosts = (props) => {

  let postsElements = props.posts.map(p => <Post message={p.post} likesCount={p.likesCount} />)

  let addNewPost = (values) => {
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

let maxLength10 = maxLengthCreator(10);

const ProfilePostForm = (props) => {

  return (

    <form onSubmit={props.handleSubmit}>

      <Field placeholder={'text'} name={'newPostElement'} component={Textarea} validate={[requiredField, maxLength10 ]} />
      <div>
        <button>Send post</button>
      </div>
    </form>
  )

}

const ProfilePostReduxForm = reduxForm({form: 'profilePostForm'})(ProfilePostForm);

export default MyPosts;