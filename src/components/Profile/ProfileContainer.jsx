import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useLocation, useParams, useNavigate } from 'react-router-dom';

import { getUserProfile, getUserStatus, updateUserStatus } from "../../redux/profile_reducer";
import Profile from './Profile';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';


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

  componentDidMount() {
    // let userID = !this.props.router.params.uid ? 29634 : this.props.router.params.uid;
    let userID = this.props.router.params.uid;
    if (!this.props.router.params.uid) {
      userID = this.props.autorizedUserId;
    }

    this.props.getUserProfile(userID);
    this.props.getUserStatus(userID);
  }

  render() {

    return (
      <div>
        <Profile
          {...this.props}
          profile={this.props.profile}
          status={this.props.status}
          updateUserStatus={this.props.updateUserStatus}
        />
      </div>
    )
  }
}


let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  autorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth
});


export default compose(
  connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus }),
  // withRouter,
  withAuthRedirect
)(ProfileContainer)