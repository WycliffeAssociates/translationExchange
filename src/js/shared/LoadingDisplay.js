/*
    Shows a loading spinner if the data for a display component is still being loaded.
    Otherwise, displays the component. Use it like this:
        <LoadingDisplay loaded={this.state.dataLoaded}>
            <DataDisplayComponent data={this.state.data}/>
        </LoadingDisplay>
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoadingGif from './loading.gif';

class LoadingDisplay extends Component{

    constructor (props) {
        super(props);
        this.state = {retrying: false};
    }

    doRetry () {
        this.setState({retrying: true});
        this.props.retry();
    }

    render(){
        return (
            <div>
                {this.props.retry
                    ? <button onClick={this.doRetry.bind(this)}>retry</button>
                    : ""
                }
                {this.props.loaded
                    ? this.props.children
                    : ((this.props.retry && this.state.retrying) || (!this.props.retry && !this.state.retrying))
                        ? <img src={LoadingGif} alt="Loading..." width="66" height="66"/>
                        : ""
                }
            </div>
        );
    }
}

LoadingDisplay.propTypes = {
    loaded: PropTypes.bool.isRequired,
    retry: PropTypes.func
};

export default LoadingDisplay;