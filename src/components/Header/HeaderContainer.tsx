import React from 'react';
import { connect } from 'react-redux';

import Header, { HeaderDispatchPropsType, HeaderMapPropsType } from './Header';
import {logout} from "../../redux/auth_reducer";
import { AppStateRedicerType } from '../../redux/redux_store';


class HeaderContainer extends React.Component<HeaderMapPropsType & HeaderDispatchPropsType> {



    render() {
        return (
            <Header {...this.props} />
        );
    }
}

const mapStateToProps = (state:AppStateRedicerType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
});

export default connect<HeaderMapPropsType, HeaderDispatchPropsType, {}, AppStateRedicerType>(mapStateToProps, {logout}) (HeaderContainer);
