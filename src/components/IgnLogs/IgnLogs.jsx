import style from './IgnLogs.module.css'
import { Field, reduxForm } from "redux-form"

const LineSelectorForm = (props) => {

    return (
        <form className={style.logForm} onSubmit={props.handleSubmit}>
            <div>
                <p>Начальная строка</p>
                <Field placeholder="28" name={'lineFrom'} component={'input'} />
            </div>
            <div>
                <p>Конечная строка</p>
                <Field placeholder="32" name={'lineTo'} component={'input'} />
            </div>
            <div className={style.forButton}>
                <button>Показать</button>
            </div>
        </form>
    )
}

const LineSelectorReduxForm = reduxForm({ form: 'lineSelector' })(LineSelectorForm);

const IgnLogs = (props) => {

    const onSubmit = (formData) => {
        console.log(formData)
        // props.login(formData.email, formData.password, formData.rememberMe)
    }


    return (
        <div className={style.lroot}>

            <LineSelectorReduxForm onSubmit={onSubmit} />

        </div>
    )
}



export default IgnLogs;