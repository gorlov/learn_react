import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
// import { RouteComponentProps } from 'react-router-dom';

import { getUserProfile, getUserStatus, updateUserStatus, savePhoto } from "../../redux/profile_reducer";
import Profile from './Profile';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { withRouter, WithRouterProps } from '../../hoc/withRouter';
import { AppStateRedicerType } from '../../redux/redux_store';

type MapPropsType = ReturnType<typeof mapStateToProps>;

type MapDispatchType = {
  getUserProfile: (userId: number) => void
  getUserStatus: (userId:number) => void
  updateUserStatus: (status:string) => void
  savePhoto: (file: File) => void
}

interface PathParamsType extends WithRouterProps {
  userID: string
}

type PropsType = MapPropsType & MapDispatchType & PathParamsType;

class ProfileContainer extends React.Component<PropsType> {

  refreshProfile() {
    let userId = this.props.router.params.uid;
    if (!this.props.router.params.uid) {
      userId = this.props.autorizedUserId;
    }

    this.props.getUserProfile(userId);
    this.props.getUserStatus(userId);
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps:PropsType) {
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


let mapStateToProps = (state: AppStateRedicerType) => ({
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