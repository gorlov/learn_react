import style from './Post.module.css';

const Post = (props) => {

  return (


    <div className={style.item}>
      <div className={style.round}>йа!</div>
      <div className={style.txt}>
        <div >{props.message}</div>
        <div className={style.likes}>like: {props.likesCount}</div>
      </div>
    </div>

  );
}


export default Post;