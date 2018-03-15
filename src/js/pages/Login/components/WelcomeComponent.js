/* global require gapi:true */

import React from 'react';
import styled from 'styled-components';
import config from '../../../../config/config'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import {onLoginSuccess} from '../../../actions'
import GitHubLogin from '../../../components/social-login/GitHubLogin';


//import {dispatchToken} from '../../../actions/database.js';

export class WelcomeComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      auth2: '',
      imageSrc: 'defaultImg',
    };

    this.onSignIn = this.onSignIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }



  onLogin(user) {
    this.props.onLoginSuccess(user);
  }

  render() {


    return (

      <WelcomeDialog>


        <WelcomeIcon src={require('../../../../assets/images/welcome.png')}  />

        <span style={{display: 'block', margin: '1vw'}}>
          <WelcomeTo> <H2span> WELCOME TO </H2span> </WelcomeTo>
          <Welcomeh2 className="welcomeh2"> translation Exchange  </Welcomeh2>
        </span>

        <WelcomeInstructions className="welcomeInstructions">
          <span> To continue, please create an account or sign in with an Authorized Account.
          </span>
        </WelcomeInstructions>



        <ButtonsContainer>

          <ContinueButton onClick={()=> this.handleClick('continue')}>
            Continue <i className="fa fa-arrow-right fa-fw"></i>
          </ContinueButton>

          <GitHubLogin clientId="f5e981378e91c2067d41"
            redirectUri={config.streamingUrl}
            onSuccess={data=>this.onLogin(data)}
            onFailure={this.onLoginFailure}/>


        </ButtonsContainer>

      </WelcomeDialog>

    );
  }

  onSignIn(googleUser) {

    //console.log(googleUser);
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
    this.setState({imageSrc: profile.getImageUrl()});

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log('ID Token: ' + id_token);


    //this.props.dispatch(dispatchToken(id_token));

  }


  handleClick(clickSrc) {

    if (clickSrc === 'continue') {
      this.props.history.push('./users');
    }

  }


  signOut() {

    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
      console.log('User signed out');
    });
    console.log(auth2);

    this.setState({imageSrc: 'defaultImg'});
  }

}



const  WelcomeDialog = styled.div`

    width: 30vw;
    height: 40vw;
    padding: 2vw;
    background-color: white;
    box-shadow: 3px 3px 3px 3px rgba(0,0,0,0.4);
    margin: auto;
    border-radius: 2vw;
    border: none;
  `;

WelcomeDialog.displayName='WelcomeDialog';

const WelcomeIcon= styled.img`
    height: 7vw;
    width: 7vw;
    border-radius: 100px;
  `;
WelcomeIcon.displayName = 'WelcomeIcon';

const Welcomeh2 = styled.h2`
    marginTop: -0.5vw;
    font-size: 1.5vw;
  `;
Welcomeh2.displayName = 'Welcomeh2';

const WelcomeTo = styled.p`
    font-size: 1.5vw;
    font-weight: lighter;
    border-bottom: 1px solid lightgray;
    line-eight: 0.1vw;
  `;
WelcomeTo.displayName = 'WelcomeTo';

const H2span = styled.span`
    background: #fff;
    z-index: 2;
    padding-left: 3vw;
    padding-right: 3vw;
  `;

H2span.displayName = 'H2span';

const WelcomeInstructions =styled.p`

    font-weight: 500;
    color: gray;
    margin: 2vw;
    font-size: 1.25vw;
  `;
WelcomeInstructions.displayName = 'WelcomeInstructions';

const ContinueButton = styled.button`
    display: block;
    background: linear-gradient(to bottom, #0076FF, #00C5FF);
    /* height: 2.5vw;
    width: 14vw; */
    margin-top: 1vw;
    padding: 0.5vw 2.75vw;
    font-size: 1.45vw;
    font-weight: 100;
    color: white;
    border: none;
    border-radius: 2vw;
    box-shadow: 1px 3px 2px 1px rgba(0,0,0,0.2);
    cursor: pointer;
    `;
ContinueButton.displayName = 'ContinueButton';

const GitHubSignInButton= styled(ContinueButton)`

    padding: 0.5vw 3.5vw;
    background: white;
    margin-top: 3vw;
    color: black;
    `;
GitHubSignInButton.displayName = 'GitHubSignInButton';

const ButtonsContainer = styled.div`
    margin-top: 2vw;
    margin-left: -2vw;
    textAlign: center;
    padding: 2vw 8vw;
    width: inherit;

  `;
ButtonsContainer.displayName = 'ButtonsContainer';

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {  onLoginSuccess }, dispatch);
};


export default connect(null, mapDispatchToProps) (WelcomeComponent);
