import style from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = () => {
  return (
    <div>
      <div>New post</div>
      <div>
        <h3 className={style.header}>Posts</h3>
        <Post message="Do veniam dolore cupidatat commodo sit ex eu qui adipisicing exercitation magna velit duis."/>
        <Post message="Nisi esse cupidatat duis adipisicing fugiat aute non. Anim tempor proident velit eu aliquip irure aliquip cillum est incididunt et et dolore amet. Consequat quis cupidatat commodo eu id esse pariatur quis amet. Ut eu nulla dolor exercitation officia enim adipisicing non nulla. Excepteur anim laborum eu deserunt velit cupidatat. Pariatur nisi deserunt qui duis nostrud ea nisi. Eu incididunt exercitation fugiat nostrud mollit ea eiusmod et est cupidatat." />
        <Post message="Ipsum enim irure in excepteur ut qui anim exercitation veniam. Mollit Lorem esse proident eiusmod ullamco. Officia in consectetur eu consequat in voluptate magna velit cupidatat minim sint. Aliquip et ex cillum laborum est magna cillum non do consectetur aute ipsum deserunt." />
        <Post message="Aute irure nulla veniam ad aute eiusmod duis laboris. Esse ut magna fugiat occaecat dolore quis fugiat id. Cupidatat aliquip ullamco laborum id exercitation do nisi." />
        <Post message="Aliqua sit amet ea irure est aliqua ut amet incididunt sit culpa. Velit enim do excepteur proident dolore mollit nisi nisi Lorem velit proident. Quis ut eu sint incididunt dolor esse. Ullamco cillum et qui culpa occaecat ipsum consequat. Commodo magna quis quis eu laborum Lorem non incididunt amet ad pariatur veniam. Sunt ut et cupidatat nisi dolor in. Nostrud pariatur fugiat cillum nisi ullamco occaecat." />
        <Post message="Magna anim nostrud et consectetur ea Lorem deserunt Lorem et aute. Et laborum proident ex id nostrud labore commodo duis excepteur irure do elit nulla cupidatat. Labore Lorem mollit aliquip do quis aute occaecat." />    
      
      
      </div>
    </div>

  );
}


export default MyPosts;