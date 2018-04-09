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
            Continue <i className="fa fa-arrow-right fa-fw"></i>
          </ContinueButton>

          <GitHubLogin clientId="f5e981378e91c2067d41"
            redirectUri={config.streamingUrl}
            onSuccess={data=>this.onLogin(data)}
            onFailure={this.onLoginFailure} />


          <label style={{display: 'block', color: '#009CFF', textDecoration: 'underline', marginTop: '2vw', fontWeight: 'bold'}}> {"I'm an Admin"} </label>

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
    height: 7vw;
    width: 7vw;
  `;
Icon.displayName = 'Icon';

const Welcome = styled.div`

  font-size: 1.5vw;
  font-weight: 200;
  overflow: hidden;
  text-align: center;
  color: #2D2D2D;

  :before,
  :after {
  background-color: #969595;
  content: "";
  display: inline-block;
  height: 1px;
  position: relative;
  vertical-align: middle;
  width: 40%;
  }
  :before {
  right: 0.5em;
  margin-left: -50%;
  }
  :after {
  left: 0.5em;
  margin-right: -50%;
  }
  `;
Welcome.displayName = 'Welcomeh2';

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
    margin-top: 2vw;
    margin-left: -2vw;
    textAlign: center;
    padding: 2vw 8vw;
    width: inherit;

  `;
ButtonsContainer.displayName = 'ButtonsContainer';
