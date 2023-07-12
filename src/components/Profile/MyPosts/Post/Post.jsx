import style from './Post.module.css';

const Post = (props) => {

  return (
    
    
    <div className={style.item}>
      <div className={style.round}>йа!</div>
      <div className={style.txt}>{props.message}</div>
    </div>

  );
}


export default Post;