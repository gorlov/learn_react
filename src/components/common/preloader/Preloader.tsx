// import preloader from ' ../../../assets/images/loading.svg';
import preloader from '@assets/images/loading.svg';


import style from './Preloader.module.css'


const Preloader:React.FC = (props: {}) => {
    return (
        <div>
            <img className={style.preloader} src='@assets/images/loading.svg' />
        </div>

    )
}

export default Preloader;