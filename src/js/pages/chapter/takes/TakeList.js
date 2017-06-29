import React, { Component } from 'react';
import PropTypes from "prop-types";
import TakeContainer from "./TakeContainer";
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
            <TakeContainer
                take={take}
            />
        );
    }
}

TakeList.propTypes = {
    takes: PropTypes.arrayOf(TakePropTypes).isRequired
};

export default TakeList;