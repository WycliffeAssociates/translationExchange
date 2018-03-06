/* global require gapi:true */
import React, { Component } from 'react';
// import {OAuthSignIn} from 'redux-auth/material-ui-theme';
import 'css/home.css';
import {connect} from 'react-redux';
import {dispatchToken} from '../../actions/database.js';
var defaultImg = require('../../../images/white.png');

class User extends Component {

  constructor(props) {
    super(props);

    this.state = {
      auth2: '',
      imageSrc: defaultImg,
    };

    this.onSignIn = this.onSignIn.bind(this);
    this.signOut = this.signOut.bind(this);

  }


  componentDidMount() {

    //specs/styling for the rendering of google sign in button
    gapi.signin2.render('g-signin2', {
      'scope': 'https://www.googleapis.com/auth/plus.login',
      'width': 480,
      'height': 40,
      'longtitle': false,
      'theme': 'light',
      'onsuccess': this.onSignIn,
    });

  }




  onSignIn(googleUser) {

    console.log(googleUser);
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


    this.props.dispatch(dispatchToken(id_token));

  }

  signOut() {

    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
      console.log('User signed out');
    });
    console.log(auth2);

    this.setState({imageSrc: defaultImg});
  }


  render() {

    return (
      <div>
        <div
          style={{textAlign: 'center', margin: 'auto', marginTop: '10vw',
            height: 'inherit', width: '50vw', border: 'solid', borderColor: 'lightgray',
            borderWidth: '0.5px', padding: '2vw', boxShadow: '5px 5px 5px rgba(0,0,0,0.6)'}}>


          <img src={this.state.imageSrc}  style={{margin: 'auto', borderRadius: '100px', height: '7vw', width: '7vw'}} />

          <div id="g-signin2" onSuccess= {this.onSignIn} style={{margin: 'auto', textAlign: 'center', marginLeft: '4.5vw'}}> </div>


          <button style={{width: '80%', height: '3vw', marginTop: '1vw',
            backgroundColor: '#FF6600', color: 'white', border: 'none', boxShadow: '1px 1px 1px rgba(0,0,0,0.6)'}}> Create Account </button>

          <button style={{width: '80%', height: '3vw', marginTop: '1vw',
            backgroundColor: '#CC0000', color: 'white', border: 'none', boxShadow: '1px 1px 1px rgba(0,0,0,0.6)'}}
          onClick={this.signOut}> Sign Out </button>

        </div>


        <button> <a href="https://github.com/login/oauth/authorize?scope=user:email&client_id=f570d7b8fb0342eb629b">SIGN IN WITH GITHUB </a> </button>

      </div>

    );
  }

}

const mapDispatchToProps = (dispatch) => ({dispatch});


export default connect(mapDispatchToProps)(User);
