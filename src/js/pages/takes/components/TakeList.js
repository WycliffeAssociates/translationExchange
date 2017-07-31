import React, { Component } from 'react';
import PropTypes from "prop-types";
import TakeContainer from "../TakeContainer";
import TakePropTypes from "./TakePropTypes";

var iterator;
class TakeList extends Component {


    render () {

        return (
            <div>
                {this.props.takes.map(this.createListItem.bind(this))}
            </div>

        );
    }

    createListItem (take) {

        return (
            <div>
                <TakeContainer
                    take={take} // one take
                    count={take.order}
                    source={take.source}
                    chunkNumber={this.props.chunkNumber}
                    addToListenList={this.props.addToListenList}
                    patchTake={this.props.patchTake}
                    deleteTake={this.props.deleteTake}
                    updateChosenTakeForChunk={this.props.updateChosenTakeForChunk}
                    onClickSave={this.props.onClickSave}
                    deleteComment={this.props.deleteComment}
                    playTake={this.props.playTake}
                    mode={this.props.mode}

                />
                <br />
            </div>
        );
    }
}

TakeList.propTypes = {
    takes: PropTypes.arrayOf(TakePropTypes).isRequired
};

export default TakeList;