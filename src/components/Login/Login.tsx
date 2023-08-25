import { connect } from "react-redux";
import { Field, InjectedFormProps, SubmitHandler, reduxForm } from "redux-form"

import style from "./Login.module.css"
import { login, logout } from '../../redux/auth_reducer'
import { Navigate } from "react-router-dom";
import { AppStateRedicerType } from "../../redux/redux_store";
import { Input, createField } from "../common/FormsControls/FormsControls";
import { requiredField } from "../../utils/validators/validators";
import appReducer from "../../redux/app_reducer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";


const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType>> = ({ handleSubmit, error }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormValuesTypeKeys>('email', 'email', [requiredField], Input)}
            {createField<LoginFormValuesTypeKeys>('password', 'password', [requiredField], Input, { type: 'password' })}
            {createField<LoginFormValuesTypeKeys>(undefined, 'rememberMe', [], Input, { type: 'checkbox' }, 'Запомнить')}

            {error && <div className={style.formError}>
                <p>{error}</p>
            </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType>({ form: 'login' })(LoginForm);

type LoginFormValuesType = SubmitHandler & {
    email: string
    password: string
    rememberMe: boolean
}

type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>


type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean) => void
}

export const Login: React.FC = () => {

    const isAuth = useSelector((state: AppStateRedicerType) => state.auth.isAuth);

    const dispatch: ThunkDispatch<{}, {}, any> = useDispatch();

    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe));
    }

    if (isAuth) {
        return <Navigate to={"/profile"} />
    }

    return (
        <div className={style.loginWrapper}>
            <h2>Login</h2>

            <LoginReduxForm onSubmit={onSubmit} />

        </div>
    )

}

// const mapStateToProps = (state:AppStateRedicerType):MapStateToPropsType => ({
//     isAuth: state.auth.isAuth
// })

// export default connect(null, { login })(Login);