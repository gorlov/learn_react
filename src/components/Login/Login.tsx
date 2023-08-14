import { connect } from "react-redux";
import { Field, InjectedFormProps, SubmitHandler, reduxForm } from "redux-form"

import style from "./Login.module.css"
import { login, logout } from '../../redux/auth_reducer'
import { Navigate } from "react-router-dom";
import { AppStateRedicerType } from "../../redux/redux_store";


const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType>> = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder="email" name={'email'} component={'input'} />
            </div>
            <div>
                <Field placeholder="password" name={'password'} type={'password'} component={'input'} />
            </div>
            <div>
                <Field type={'checkbox'} name={'rememberMe'} component={'input'} /> Запомнить
            </div>
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

type LoginFormValuesType = SubmitHandler &  {
    email:string
    password:string
    rememberMe:boolean
}

type MapStateToPropsType = {
    isAuth: boolean
}

type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean) => void
}

const Login: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {

    const onSubmit = (formData: LoginFormValuesType) => {
        console.log(formData)
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Navigate to={"/profile"} />
    }

    return (
        <div className={style.loginWrapper}>
            <h2>Login</h2>

            <LoginReduxForm onSubmit={onSubmit} />

        </div>
    )

}

const mapStateToProps = (state:AppStateRedicerType):MapStateToPropsType => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { login })(Login);