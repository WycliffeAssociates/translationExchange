import React, { Component } from 'react';
import PropTypes from "prop-types";
import Take from "./Take";
import TakePropTypes from "./TakePropTypes";

class TakeList extends Component {
    render () {
        return (
            <div>
                {this.props.takes.map(this.createListItem)}
            </div>
        );
    }

    createListItem (take) {
        return (
            <Take
                take={take}
            />
        );
    }
}

TakeList.propTypes = {
    takes: PropTypes.arrayOf(TakePropTypes).isRequired
};

export default TakeList;