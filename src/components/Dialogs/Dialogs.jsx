
import { NavLink } from 'react-router-dom';
import style from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';


const Dialogs = (props) => {

    console.log('Dialogs.jsx')
    console.log(props)

    let dialogData = props.state.dialogs;

    let messagesData = props.state.messages;

    let dialogItems = dialogData.map(dialog => <DialogItem name={dialog.name} id={dialog.id} />);

    let messagesItems = messagesData.map(messageItem => <Message message={messageItem.message} />)

    return (
        <div className={style.dialogs}>
            <div className={style.dialogsItems}>
                { dialogItems }
            </div>

            <div className={style.messages}>
                {messagesItems}
            </div>
        </div>
    );

}

export default Dialogs;