import React from 'react';
import { Route, Routes, useLocation, useParams, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import Navbar from './components/Navigation/Navigation';
import ProfileContainer from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import {getMe} from "./redux/auth_reducer";
import { compose } from 'redux';

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}


class App extends React.Component {

  componentDidMount() {
    this.props.getMe();
  }

  render() {
    return (
      <div className='App'>
        <HeaderContainer />
        <Navbar />
        <div className='app-wrapper-content'>
          <Routes>

            <Route path='/dialogs/:id?' element={<DialogsContainer />} />

            <Route path='/profile/:uid?' element={<ProfileContainer />} />

            <Route path='/users' element={<UsersContainer />} />

            <Route path='/login' element={<Login />} />

          </Routes>
        </div>
      </div>
    );
  }
}



export default compose(
  withRouter,
  connect(null, { getMe }) (App));


