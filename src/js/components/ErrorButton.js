import React, { Component } from 'react';
import { Button } from "semantic-ui-react";
import PropTypes from 'prop-types';

class ErrorButton extends Component {
    render() {
        return (
            <Button
                label={{ as: 'a', basic: true, pointing: 'right', content: `${this.props.error.message}` }}
                labelPosition='left'
                onClick={this.props.retry}
            />
        );
    }
}
ErrorButton.proptype = {
    retry: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired
}

export default ErrorButton;
