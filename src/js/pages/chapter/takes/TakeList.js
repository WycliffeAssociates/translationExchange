import React, { Component } from 'react';
import PropTypes from "prop-types";
import TakeContainer from "./TakeContainer";
import TakePropTypes from "./TakePropTypes";

var iterator;
class TakeList extends Component {
    render () {

        iterator = 0;
        return (
            <div>
                {this.props.takes.map(this.createListItem)}
            </div>

        );
    }

    createListItem (take) {
        iterator += 1;
        return (
            <div>
                <TakeContainer
                    take={take} // one take
                    count={iterator}

                />
            </div>
        );
    }
}
/*
TakeList.propTypes = {
    takes: PropTypes.arrayOf(TakePropTypes).isRequired
};
*/
export default TakeList;