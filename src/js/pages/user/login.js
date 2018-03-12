import React, { Component } from 'react'

import GitHubLogin from '../../components/social-login/GitHubLogin';
import GoogleLogin from '../../components/social-login/GoogleLogin';
import TeLogin from '../../components/social-login/TeLogin';

import axios from "axios";
import config from "../../../config/config";

export default class Demo extends Component {
  constructor (props) {
    super(props)

    this.state = {
      logged: false,
      user: {},
      currentProvider: ''
    }
    this.nodes = {}

    this.onLoginSuccess = this.onLoginSuccess.bind(this)
    this.onLoginFailure = this.onLoginFailure.bind(this)
    this.onLogoutSuccess = this.onLogoutSuccess.bind(this)
    this.onLogoutFailure = this.onLogoutFailure.bind(this)
    this.logout = this.logout.bind(this)
  }

  setNodeRef (provider, node) {
    if (node) {
      this.nodes[ provider ] = node
    }
  }

  onLogoutClick = () => {
    localStorage.removeItem('token');
    alert("Logged out!");
  }

  onLoginSuccess (user) {
    return axios.post("https://localhost/api/login/social/token_user/github/",{clientId:'f5e981378e91c2067d41',redirectUri:'https://localhost/',code:user.code}).
    then(response=>{
      console.log(response);
      localStorage.setItem('token',response.data.token);
    }).catch(err=>{
      console.log(err);
    }
    );
  }

  onGoogleLoginSuccess (user) {
    return axios.post("https://localhost/api/login/social/token_user/google-oauth2/",{clientId:'429550859531-rp6ihtu7o9fe9uko3t6523hs8m5b06ir.apps.googleusercontent.com',redirectUri:'https://localhost/',code:user.code}).
    then(response=>{
      console.log(response);
      localStorage.setItem('token',response.data.token);
    }).catch(err=>{
      console.log(err);
    }
    );
  }

  onTeLoginSuccess (user) {
    console.log(user);
    localStorage.setItem('token',user.token);
  }

  onLoginFailure (err) {
    console.error(err)
  }

  onLogoutSuccess () {
    this.setState({
      logged: false,
      currentProvider: '',
      user: {}
    })
  }

  onLogoutFailure (err) {
    console.error(err)
  }

  logout () {
    const { logged, currentProvider } = this.state

    if (logged && currentProvider) {
      this.nodes[currentProvider].props.triggerLogout()
    }
  }

  render () {
    return (
      <div>
        <GitHubLogin clientId="f5e981378e91c2067d41"
          redirectUri="https://localhost/"
          onSuccess={this.onLoginSuccess}
          onFailure={this.onLoginFailure}/>
         <GoogleLogin clientId="429550859531-rp6ihtu7o9fe9uko3t6523hs8m5b06ir.apps.googleusercontent.com"
          redirectUri="https://localhost/"
          onSuccess={this.onGoogleLoginSuccess}
          onFailure={this.onLoginFailure}/>

        <br/>

        <TeLogin iconHash="jk53h543kjh6k3j463h4"
          buttonText="Create user jk53h543kjh6k3j463h4"
          onSuccess={this.onTeLoginSuccess}
          onFailure={this.onLoginFailure}/>
        <TeLogin iconHash="jk53h543kjh6k3j463h4"
          isLogin={true}
          buttonText="Login to user jk53h543kjh6k3j463h4"
          onSuccess={this.onTeLoginSuccess}
          onFailure={this.onLoginFailure}/>

        <br/>

        <TeLogin iconHash="hlehsle435o463lk46h346h"
          buttonText="Create user hlehsle435o463lk46h346h"
          onSuccess={this.onTeLoginSuccess}
          onFailure={this.onLoginFailure}/>
        <TeLogin iconHash="hlehsle435o463lk46h346h"
          isLogin={true}
          buttonText="Login to user hlehsle435o463lk46h346h"
          onSuccess={this.onTeLoginSuccess}
          onFailure={this.onLoginFailure}/>

        <br/><br/>

        <button onClick={this.onLogoutClick}>Logout</button>
      </div>
    )
  }  
}
