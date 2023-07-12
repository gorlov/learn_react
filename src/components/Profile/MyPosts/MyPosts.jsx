import style from './MyPosts.module.css';

const MyPosts = () => {
  return (
    <div>
      My posts
      <div>New post</div>
      <div>
        <h3>Posts</h3>
        <div className={style.item}>Duis anim minim magna esse ad eu nulla minim dolore laboris Lorem.</div>
        <div className={style.item}>Ipsum adipisicing labore nostrud laborum culpa incididunt exercitation nulla sint laborum.</div>
        <div className={style.item}>Amet ut incididunt enim excepteur exercitation dolor.</div>
        <div className={style.item}>Deserunt sit officia proident cupidatat dolor.</div>
      </div>
    </div>

  );
}


export default MyPosts;