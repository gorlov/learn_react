
import style from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import {updateNewMessageBodyCreator, sendMessageCreator} from '../../redux/dialogs_reducer'


const Dialogs = (props) => {

    console.log('Dialogs.jsx');
    console.log(props);

    let state = props.store.getState().dialogsPage;

    let dialogData = state.dialogs;

    let messagesData = state.messages;

    let dialogItems = dialogData.map(dialog => <DialogItem name={dialog.name} id={dialog.id} />);

    let messagesItems = messagesData.map(messageItem => <Message message={messageItem.message} />);

    let newMessageBody = state.newMessageBody;

    let onSendMessageClick = () => {
        props.store.dispatch(sendMessageCreator())

    }

    let onNewMessageChange = (e) => {
        let body = e.target.value;
        props.store.dispatch(updateNewMessageBodyCreator(body))
    }

    return (
        <div className={style.dialogs}>
            <div className={style.dialogsItems}>
                {dialogItems}
            </div>

            <div className={style.messages}>
                <div>{messagesItems}</div>
                <div>
                    <div>
                        <textarea 
                            value={newMessageBody}
                            placeholder='enter your message...'
                            onChange={onNewMessageChange}></textarea>
                    </div>
                    <div>
                        <button onClick={onSendMessageClick}>push me</button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Dialogs;