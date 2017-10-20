import React, { Component } from 'react';
import { connect } from "react-redux";
import loadingGif from '../../images/loading.gif';

class LoadingGif extends Component {
    render() {
        return (
            <div style={styles.loading}>
                <h1>{this.props.displayText}</h1>
                <img src={loadingGif} alt="Loading..." width="66" height="66" />
            </div>
        );
    }
}

const styles = {
    loading: {
        display: 'flex',
        height: 400,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }

};


export default LoadingGif;
