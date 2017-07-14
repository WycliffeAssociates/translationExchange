/*
    Shows a loading spinner if the data for a display component is still being loaded.
    Otherwise, displays the component. Use it like this:
        <LoadingDisplay loaded={this.state.dataLoaded}
                        error={this.state.errorMessage}
                        retry={this.requestDataFunction}>
            <DataDisplayComponent data={this.state.data}/>
        </LoadingDisplay>
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Button} from "semantic-ui-react";
import LoadingGif from '../../images/loading.gif';

class LoadingDisplay extends Component{
    render(){
        // "There was a problem loading the data: " + this.props.error.message
        return (
            <div>
                {this.props.error
                    ? <div>
                        <Button
                            label={{as: 'a', basic: true, pointing: 'right', content: "There was a problem loading the data: " + this.props.error.message}}
                            labelPosition='left'
                            onClick={this.props.retry}
                            content='Retry'
                        />
                      </div>
                    : this.props.loaded
                        ? this.props.children
                        : <img src={LoadingGif} alt="Loading..." width="66" height="66"/>
                }
            </div>
        );
    }
}

LoadingDisplay.propTypes = {
    loaded: PropTypes.bool.isRequired, //is the data loaded and ready to display?
    error: PropTypes.string, //empty if there is no error, error message if there is a problem
    retry: PropTypes.func.isRequired //function to call when retrying data request
};

export default LoadingDisplay;