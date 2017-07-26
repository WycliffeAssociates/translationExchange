import React, { Component } from 'react';
import PropTypes from "prop-types";
import TakeContainer from "../TakeContainer";
import TakePropTypes from "./TakePropTypes";
import TakeList from './TakeList'

var iterator;
class TakeTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rating: this.props.column

        }

    }

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
                <TakeList
                    takes={this.props.takes}
                    addToListenList={this.props.addToListenList}
                    patchTake={this.props.patchTake}
                    deleteTake={this.props.deleteTake}
                    updateChosenTakeForChunk={this.props.updateChosenTakeForChunk}
                    onClickSave={this.props.onClickSave}
                    ratingToGet={this.state.rating}
                    // deleteComment={this.props.deleteComment}
                />
            </div>
        );
    }
}

export default TakeTable;