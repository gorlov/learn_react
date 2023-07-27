import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { useLocation, useParams, useNavigate, Navigate } from 'react-router-dom';

import { getUserProfile } from "../../redux/profile_reducer";
import Profile from './Profile';
import { profileAPI } from '../../api/api';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
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

class ProfileContainer extends React.Component {

  // ${this.props.router.params.uid}

  componentDidMount() {
    let userID = !this.props.router.params.uid ? 29634 : this.props.router.params.uid;

    this.props.getUserProfile(userID);

  }


  render() {

    return (

      <div>
        <Profile {...this.props} profile={this.props.profile} />
      </div>
    )
  }
}


let mapStateToProps = (state) => ({
  profile: state.profilePage.profile
});


export default compose(
  connect(mapStateToProps, { getUserProfile }),
  withRouter,
  withAuthRedirect  
)(ProfileContainer)