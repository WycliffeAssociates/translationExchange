import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TakeRating extends Component {
    render () {
        this.props.onChange("test natties");
        return (
            <div>
                {this.props.rating} stars, put star component here...
            </div>
        );
    }
}

TakeRating.propTypes = {
    rating: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};

export default TakeRating;
