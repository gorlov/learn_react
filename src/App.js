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
import { initializeApp } from "./redux/app_reducer";
import { compose } from 'redux';
import  withRouter  from './hoc/withRouter';
import Preloader from './components/common/preloader/Preloader';
import IgnLogs from './components/IgnLogs/IgnLogs';


class App extends React.Component {

  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    
    if (!this.props.initialized) {
      return <Preloader />
    }

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

            <Route path='/ignlogs' element={<IgnLogs />} />

            <Route path="*"  status={404}/>

          </Routes>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  initialized: state.app.initialized
});

// export default withRouter(connect(null, { getMe })(App));

export default compose(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App);



