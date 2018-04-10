import React, { Component } from "react";
import styled from "styled-components";

import PopupWindow from "./PopupWindow";
import { toQuery } from "./utils";

class GitHubLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      left: 0,
      top: 0,
      height: 0,
      width: 0
    };
  }

  componentDidMount() {
    const width = window.outerWidth * 0.6;
    const height = window.innerHeight * 0.6;
    const left = window.innerWidth * 0.25;
    const top = window.innerHeight * 0.25;

    this.setState({ left, top, width, height });
  }

  static defaultProps = {
    buttonText: "Sign in with GitHub",
    scope: "user:email",
    onRequest: () => {},
    onSuccess: () => {},
    onFailure: () => {}
  };

  onBtnClick = () => {
    const { clientId, scope, redirectUri } = this.props;
    const { left, top, height, width } = this.state;
    const search = toQuery({
      client_id: clientId,
      scope,
      redirect_uri: redirectUri
    });
    const popup = (this.popup = PopupWindow.open(
      "github-oauth-authorize",
      `https://github.com/login/oauth/authorize?${search}`,
      { height, width, left, top }
    ));

    this.onRequest();
    popup.then(data => this.onSuccess(data), error => this.onFailure(error));
  };

  onRequest = () => {
    this.props.onRequest();
  };

  onSuccess = data => {
    if (!data.code) {
      console.log("there was a problem captain");
      return this.onFailure(new Error("'code' not found"));
    }

    this.props.onSuccess(data);
  };

  onFailure = error => {
    this.props.onFailure(error);
  };

  render() {
    const { className, buttonText, children } = this.props;
    const attrs = { onClick: this.onBtnClick };

    if (className) {
      attrs.className = className;
    }

    return (
      <GitHubSignInButton {...attrs}>
        <GihubIcon src={require("../../../assets/images/github.png")} />Sign in
        with Github
      </GitHubSignInButton>
    );
  }
}

const GihubIcon = styled.img`
  height: 1.5vw;
  width: 1.5vw;
`;
const GitHubSignInButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.6vw 1.4vw;
  background: white;
  margin-top: 3vw;
  color: black;
  font-size: 1vw;
  font-weight: 100;
  border: none;
  border-radius: 2vw;
  box-shadow: 1px 3px 2px 1px rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;
export default GitHubLogin;
