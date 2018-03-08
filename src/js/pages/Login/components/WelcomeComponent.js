/* global require gapi:true */

import React from 'react';
import {Link} from 'react-router-dom';
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

  componentWillMount() {

    //specs/styling for the rendering of google sign in button
    //gapi.signin2.render('g-signin2', {
    //  'scope': 'https://www.googleapis.com/auth/plus.login',
    //  'longtitle': true,
      //'width': '225vw',
      // 'height': 40,
    //  'theme': 'light',
      //'onsuccess': this.onSignIn,
  //  });

  }

  render() {


    return (
      <div className="container">
      <div className="backgroundOverlay">

        <div className= "WelcomeDialog">


          <img className="iconWelcome" src={require('../../../../images/welcome.png')}  />

          <span style={{display: 'block', margin: '1vw'}}>
            <p className ="welcomeTo"> <span className="h2span"> WELCOME TO </span> </p>
            <h2 className="welcomeh3"> translation Exchange  </h2>
          </span>

          <p className="welcomeInstructions">
            <span> To continue, please create an account or sign in with an Authorized Account.
            </span>
          </p>


          <div className="buttons">

            <button className="continueButton" onClick={()=> this.handleClick('continue')}>
              Continue <i className="fa fa-arrow-right fa-fw fa-lg"></i>
            </button>





            { /*
              <div>
                <button id="g-signin2" style={{display: 'block', border: 'none', margin: 'auto', marginTop: '1vw', marginBottom: '1vw'}}
                  onSuccess= {this.onSignIn}> </button>
              </div> */
            }

            <button className="gitHubSignInButton">
              <i className="fa fa-github fa-fw fa-lg" />
              <a className="signInLink"
                href="https://github.com/login/oauth/authorize?scope=user:email&client_id=f570d7b8fb0342eb629b"> Sign in</a>

            </button>



          </div>

        </div>
      </div>
      </div>
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

export default WelcomeComponent;
