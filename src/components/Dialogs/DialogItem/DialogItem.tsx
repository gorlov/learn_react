import { NavLink } from 'react-router-dom';
import style from './DialogItem.module.css';
import withRouter from '../../../hoc/withRouter';


type PropsType = {
    name: string
    id: number
}

const DialogItem:React.FC<PropsType> = (props) => {

    let path = `/dialogs/${props.id}`;

    let onNavClick = () => {
        console.log(props);
    }

    return (
        <div className={style.dialog}>
            <NavLink onClick={onNavClick} to={path}>{props.name}</NavLink>
        </div>
    )

}

export default DialogItem;