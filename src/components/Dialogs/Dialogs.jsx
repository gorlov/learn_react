
import style from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { Navigate } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../common/FormsControls/FormsControls';
import { maxLengthCreator, requiredField } from '../../utils/validators/validators';


const Dialogs = (props) => {

    console.log('Dialogs.jsx');
    console.log(props);

    let state = props.dialogsPage;
    let dialogData = state.dialogs;
    let messagesData = state.messages;

    let dialogItems = dialogData.map(dialog => <DialogItem name={dialog.name} id={dialog.id} />);
    let messagesItems = messagesData.map(messageItem => <Message message={messageItem.message} />);

    let addNewMassage = (values) => {
        props.sendMessage(values.newMessageBody);
    }

    return (
        <div className={style.dialogs}>
            <div className={style.dialogsItems}>
                {dialogItems}
            </div>

            <div className={style.messages}>
                <div>{messagesItems}</div>

                <DialogAddMassageReduxForm onSubmit={addNewMassage} />

            </div>
        </div>
    );

}

const maxLength50 = maxLengthCreator(50); 

const DialogAddMassageForm = (props) => {

    return (

        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name='newMessageBody' placeholder='enter your message...' component={Textarea}
                validate={[requiredField, maxLength50 ]} />
            </div>
            <div>
                <button>push me</button>
            </div>
        </form>
    )
}

const DialogAddMassageReduxForm = reduxForm({form: 'dialogMassage'})(DialogAddMassageForm);

export default Dialogs;