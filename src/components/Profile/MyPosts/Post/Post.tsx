import { PostType } from '../../../../types/types';
import style from './Post.module.css';

type PropsType = {
  message: string
  likesCount: number

}

const Post: React.FC<PropsType> = (props) => {

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