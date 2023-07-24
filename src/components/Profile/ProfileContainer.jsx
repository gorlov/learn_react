import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { useLocation, useParams, useNavigate } from 'react-router-dom';

import { setUserProfile } from "../../redux/profile_reducer";
import Profile from './Profile';


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
    


    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userID}`)
      .then(responce => {
        console.log(responce);
        this.props.setUserProfile(responce.data);
      });
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


export default connect(mapStateToProps, {setUserProfile})(withRouter(ProfileContainer));