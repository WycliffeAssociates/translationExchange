import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class SourceAudioButton extends Component{

    render(){
        return (
            <Button icon='assistive listening systems'
                    onClick={() => this.props.onSourceClicked(this.props.startv)}/>
        );
    }
}

SourceAudioButton.propTypes = {
    startv: PropTypes.number.isRequired,
    onSourceClicked: PropTypes.func.isRequired
};

export default SourceAudioButton