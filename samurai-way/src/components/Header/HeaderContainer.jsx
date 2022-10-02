import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { isUserAuthorized_TC, logOutUser_TC } from '../../redux/auth-reducer';

class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.isUserAuthorized_TC();
    // usersAPI.authorizeUser().then((response) => {
    //   if (response.data.resultCode === 0) {
    //     let { id, login, email } = response.data.data;
    //     let isAuth = true;
    //     this.props.setAuthUserData(id, login, email, isAuth);
    //   } else console.log(response.data);
    // });
  }

  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
  };
};

export default connect(mapStateToProps, { isUserAuthorized_TC, logOutUser_TC })(
  HeaderContainer,
);
