import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import Header from './Header';
import {getMe, setAuthUserData} from "../../redux/auth_reducer";
import { authAPI } from '../../api/api';


class HeaderContainer extends React.Component {

    componentDidMount() {
        this.props.getMe();
    }

    render() {
        return (
            <Header {...this.props} />
        );
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
});

export default connect(mapStateToProps, {setAuthUserData, getMe}) (HeaderContainer);
