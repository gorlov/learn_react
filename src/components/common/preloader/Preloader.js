import preloader from '../../../assets/images/loading.svg';

import style from './Preloader.module.css'


let Preloader = (props) => {
    return (
        <div>
            <img className={style.preloader} src={preloader} />
        </div>

    )
}

export default Preloader;