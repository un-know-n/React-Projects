import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { logOutUser_TC } from '../../redux/auth-reducer';

class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);
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

export default connect(mapStateToProps, { logOutUser_TC })(HeaderContainer);
