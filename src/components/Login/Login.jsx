import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form"

import style from "./Login.module.css"
import { login, logout } from '../../redux/auth_reducer'
import { Navigate } from "react-router-dom";


const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder="email" name={'email'} component={'input'} />
            </div>
            <div>
                <Field placeholder="password" name={'password'} type={'password'} component={'input'} />
            </div>
            <div>
                <Field type={'checkbox'} name={'rememberMe'} component={'input'} /> Запомнить
            </div>
            {props.error && <div className={style.formError}>
                <p>{props.error}</p>
            </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

const Login = (props) => {

    const onSubmit = (formData) => {
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

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { login })(Login);