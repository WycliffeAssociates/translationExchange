import React, { Component } from 'react'

import GitHubLogin from 'react-github-login';
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
          redirectUri="https://localhost" 
          onSuccess={this.onLoginSuccess}
          onFailure={this.onLoginFailure}/>
      </div>
    )
  }  
}
