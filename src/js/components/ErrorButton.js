import React, { Component } from 'react';
import {Button} from "semantic-ui-react";
import PropTypes from 'prop-types';
export default class ErrorButton extends Component {
    render () {
        return (
            <Button
            label={{as: 'a', basic: true, pointing: 'right', content: "There was a problem loading the data: " + this.props.error.message}}
            labelPosition='left'
            onClick={this.props.retry}
            content='Retry'
        />
        );
    }
}
ErrorButton.proptype={
    retry:PropTypes.func.isRequired,
    error: PropTypes.string.isRequired
}