import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useLocation, useParams, useNavigate } from 'react-router-dom';

import { getUserProfile, getUserStatus, updateUserStatus, savePhoto } from "../../redux/profile_reducer";
import Profile from './Profile';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import withRouter from '../../hoc/withRouter';


class ProfileContainer extends React.Component {

  refreshProfile() {
    let userID = this.props.router.params.uid;
    if (!this.props.router.params.uid) {
      userID = this.props.autorizedUserId;
    }

    this.props.getUserProfile(userID);
    this.props.getUserStatus(userID);
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps) {
    if (this.props.router.params.uid != prevProps.router.params.uid) {
      this.refreshProfile();
    }
  }

  render() {

    return (
      <div>
        <Profile
          {...this.props}
          isOwner={!this.props.router.params.uid}
          profile={this.props.profile}
          status={this.props.status}
          updateUserStatus={this.props.updateUserStatus}
          savePhoto={this.props.savePhoto}
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
  connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus, savePhoto }),
  withRouter,
  withAuthRedirect
)(ProfileContainer)