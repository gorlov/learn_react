
import { NavLink } from 'react-router-dom';
import style from './Dialogs.module.css';

const DialogItem = (props) => {

    let path = `/dialogs/${props.id}`;

    return (
        <div className={style.dialog}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )

}

const Message = (props) => {
    return (
        <div className={style.message}>{props.message}</div>
    )
}

const Dialogs = () => {

    return (
        <div className={style.dialogs}>
            <div className={style.dialogsItems}>

                <DialogItem name='Gorlov' id='1' />
                <DialogItem name='merlin' id='2' />

            </div>
            <div className={style.mesages}>
                <Message message="h!" />
                <Message message="WTF?!" />
                <Message message="Ex exercitation cupidatat nisi eu." />
            </div>
        </div>
    );

}

export default Dialogs;