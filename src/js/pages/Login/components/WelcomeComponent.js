/* global require gapi:true */

import React from 'react';
import styled from 'styled-components';
import config from '../../../../config/config';
import GitHubLogin from '../../../components/social-login/GitHubLogin';


//import {dispatchToken} from '../../../actions/database.js';

export default class WelcomeComponent extends React.Component {

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

      <WelcomePage>

        <h2 className="welcomeh2"> translation Exchange  </h2>
        <Icon src={require('../../../../assets/images/undraw_welcome_3gvl.svg')}  />


        <ButtonsContainer>

          <ContinueButton onClick={()=> this.handleClick('continue')}>
            Continue <i className="material-icons">arrow_forward </i>
          </ContinueButton>

          <GitHubLogin clientId="f5e981378e91c2067d41"
            redirectUri={config.streamingUrl}
            onSuccess={data=>this.onLogin(data)}
            onFailure={this.onLoginFailure} />

        </ButtonsContainer>

      </WelcomePage>

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



const  WelcomePage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  justify-self: center;
  max-width: 50%;
  height: 80%;
  text-align: center;
  //border: solid #969595 0.1vw;
  border-radius: 0.5vw;
  box-shadow: 2px 2px 2px 2px rgba(0,0,0,0.5);
  `;

WelcomePage.displayName='WelcomePage';

const Icon= styled.img`
    height: 8vw;
    width: 8vw;
  `;
Icon.displayName = 'Icon';


const ContinueButton = styled.button`
    display: flex;
    align-items:center;
    background: linear-gradient(to bottom, #0076FF, #00C5FF);
    /* height: 2.5vw;
    width: 14vw; */
    margin-top: 1vw;
    padding: 0.5vw 3.3vw;
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
    margin-top: 5vw;
    textAlign: center;
    padding: 2vw 8vw;
    width: inherit;

  `;
ButtonsContainer.displayName = 'ButtonsContainer';
