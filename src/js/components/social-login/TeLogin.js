import React, { Component } from 'react';
import PropTypes from 'prop-types';

import axios from "axios";
import { toQuery } from './utils';

class TeLogin extends Component {
  static propTypes = {
    buttonText: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    iconHash: PropTypes.string.isRequired,
    isLogin: PropTypes.bool,
    onRequest: PropTypes.func,
    onSuccess: PropTypes.func,
    onFailure: PropTypes.func,
  }

  static defaultProps = {
    buttonText: 'Sign in with Identicon',
    onRequest: () => {},
    onSuccess: () => {},
    onFailure: () => {},
  }

  onBtnClick = () => {
    const { iconHash, isLogin } = this.props;

    this.onRequest();

    var url = "https://localhost/api/auth/create/";
    if(isLogin) {
      url = "https://localhost/api/auth/login/";
    }

    return axios.post(url, {iconHash: iconHash}).
      then(data => {
        this.onSuccess(data)
      }).catch(error => {
        this.onFailure(error)
      }
    );
  }

  onRequest = () => {
    this.props.onRequest();
  }

  onSuccess = (response) => {
    if (!response.data.token) {
      return this.onFailure(new Error('\'token\' not found'));
    }

    this.props.onSuccess(response.data);
  }

  onFailure = (error) => {
    this.props.onFailure(error);
  }

  render() {
    const { className, buttonText, children } = this.props;
    const attrs = { onClick: this.onBtnClick };

    if (className) {
      attrs.className = className;
    }

    return <button {...attrs}>{ children || buttonText }</button>;
  }
}

export default TeLogin;