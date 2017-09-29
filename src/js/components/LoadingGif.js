import React, { Component } from 'react';
import loadingGif from '../../images/loading.gif';

export default class LoadingGif extends Component {
    render () {
        return (
            <img src={loadingGif} alt="Loading..." width="66" height="66"/>
        );
    }
}