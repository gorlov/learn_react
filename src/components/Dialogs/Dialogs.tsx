
import style from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { Navigate } from 'react-router-dom';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Textarea, createField } from '../common/FormsControls/FormsControls';
import { maxLengthCreator, requiredField } from '../../utils/validators/validators';
import { InitialStateType } from '../../redux/dialogs_reducer';

type PropsType = {
    dialogsPage: InitialStateType
    sendMessage: (messageText:string) => void
}

const Dialogs: React.FC<PropsType> = (props) => {

    console.log('Dialogs.jsx');
    console.log(props);

    let state = props.dialogsPage;
    let dialogData = state.dialogs;
    let messagesData = state.messages;

    let dialogItems = dialogData.map(dialog => <DialogItem name={dialog.name} id={dialog.id} />);
    let messagesItems = messagesData.map(messageItem => <Message message={messageItem.message} />);

    let addNewMassage = (values:NewMessageFormType) => {
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

export type NewMessageFormType = {
    newMessageBody: string
}

type NewMessageFormValuesKeysType = Extract<keyof NewMessageFormType, string>
type NewMessageFormPropsType = {}

const DialogAddMassageForm:React.FC<InjectedFormProps<NewMessageFormType, NewMessageFormPropsType> & NewMessageFormPropsType> = (props) => {

    return (

        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<NewMessageFormValuesKeysType>('enter your message...', 'newMessageBody', [requiredField, maxLength50 ], Textarea)}

                {/* <Field name='newMessageBody' placeholder='enter your message...' component={Textarea}
                validate={[requiredField, maxLength50 ]} /> */}
            </div>
            <div>
                <button>push me</button>
            </div>
        </form>
    )
}

const DialogAddMassageReduxForm = reduxForm({form: 'dialogMassage'})(DialogAddMassageForm);

export default Dialogs;