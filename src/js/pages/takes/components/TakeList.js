import React, { Component } from 'react';
import PropTypes from "prop-types";
import TakeContainer from "../TakeContainer";
import TakePropTypes from "./TakePropTypes";

var iterator;
class TakeList extends Component {
    render () {

        iterator = 0;
        return (
            <div>
                {this.props.takes.map(this.createListItem.bind(this))}
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
                    updateTakeToExport={this.props.updateTakeToExport}
                    updateTakeInState={this.props.updateTakeInState}
                    source={take.source}
                    addToListenList={this.props.addToListenList}
                    deleteTakeFromState={this.props.deleteTakeFromState}
                    patchTake={this.props.patchTake}
                    updateChosenTakeForChunk={this.props.updateChosenTakeForChunk}
                />
            </div>
        );
    }
}

TakeList.propTypes = {
    takes: PropTypes.arrayOf(TakePropTypes).isRequired
};

export default TakeList;