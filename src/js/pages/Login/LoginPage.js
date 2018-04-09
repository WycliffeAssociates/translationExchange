import React from 'react';
import WelcomeComponent from './components/WelcomeComponent.js';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {onLoginSuccess} from '../../actions';
import img from '../../../assets/images/background-pattern.png';


class Welcome extends React.Component {


  render() {

    return (
      <LoginPage>
        <WelcomeComponent {...this.props} />
      </LoginPage>
    );
  }

}

const LoginPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-image: url(${img}), linear-gradient(to bottom right, #969595 , #969595 ) ;

`;


const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {  onLoginSuccess }, dispatch);
};

export default connect(null, mapDispatchToProps) (Welcome);
