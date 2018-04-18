import React from 'react';
import WelcomeComponent from './components/WelcomeComponent.js';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {onLoginSuccess, fetchUsers, createSocialUser} from '../../actions';
import img from '../../../assets/images/background-pattern.png';


class Welcome extends React.Component {


  render() {

    return (
      <LoginPage className="pageBackground">
        <WelcomeComponent {...this.props} />
      </LoginPage>
    );
  }

}

const LoginPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

`;


const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {  onLoginSuccess, fetchUsers, createSocialUser }, dispatch);
};

const mapStateToProps = state => {
  const { socialLogin } = state.user;
  return {socialLogin};
};

export default connect(mapStateToProps, mapDispatchToProps) (Welcome);
