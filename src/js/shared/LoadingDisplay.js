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

export class LoadingDisplay extends Component{

    render(){
        return (
            <div>
                {this.props.loaded
                    ? this.props.children
                    : <img src={LoadingGif} alt="Loading..." width="66" height="66" /> }
            </div>
        );
    }
}

LoadingDisplay.propTypes = {
    loaded: PropTypes.bool.isRequired
};

export default LoadingDisplay;