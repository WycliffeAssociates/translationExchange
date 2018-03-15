import React, { Component } from 'react';
import styled from 'styled-components';

import PopupWindow from './PopupWindow';
import { toQuery } from './utils';

class GitHubLogin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      left: 0,
      top: 0,
      height: 0,
      width: 0,
    };
  }

  componentDidMount() {
    const width = window.outerWidth * .6;
    const height = window.innerHeight * .6;
    const left = window.innerWidth *.25;
    const top =  window.innerHeight * .25;

    this.setState({left, top, width, height});
  }

  static defaultProps = {
    buttonText: 'Sign in with GitHub',
    scope: 'user:email',
    onRequest: () => {},
    onSuccess: () => {},
    onFailure: () => {},
  }

  onBtnClick = () => {
    const { clientId, scope, redirectUri } = this.props;
    const {left, top, height, width} = this.state;
    const search = toQuery({
      client_id: clientId,
      scope,
      redirect_uri: redirectUri,
    });
    const popup = this.popup = PopupWindow.open(
      'github-oauth-authorize',
      `https://github.com/login/oauth/authorize?${search}`,
      { height, width, left, top }
    );

    this.onRequest();
    popup.then(
      data => this.onSuccess(data),
      error => this.onFailure(error)
    );
  }

  onRequest = () => {
    this.props.onRequest();
  }

  onSuccess = (data) => {
    if (!data.code) {
      return this.onFailure(new Error('\'code\' not found'));
    }

    this.props.onSuccess(data);
  }

  onFailure = (error) => {
    this.props.onFailure(error);
  }

  render() {
    const { className, buttonText, children } = this.props;
    const attrs = { onClick: this.onBtnClick };
    const icon =   <i className="fab fa-github fa-fw " />

    if (className) {
      attrs.className = className;
    }

    return <GitHubSignInButton {...attrs}> {icon }Sign in with Github</GitHubSignInButton>;
  }
}


const GitHubSignInButton= styled.button`
    display: block;
    padding: 0.5vw 3.5vw;
    background: white;
    margin-top: 3vw;
    color: black;
    font-size: 1vw;
    font-weight: 100;
    border: none;
    border-radius: 2vw;
    box-shadow: 1px 3px 2px 1px rgba(0,0,0,0.2);
    cursor: pointer;
    `;
export default GitHubLogin;
