import React, { Component } from 'react';
import PropTypes from "prop-types";
import TakeContainer from "../TakeContainer";
import TakePropTypes from "./TakePropTypes";

var iterator;
class TakeList extends Component {

    render () {

        var list = [];

            this.props.takes.map((i) => {
                if((i.take.rating) === (this.props.ratingToGet)) {
                    list[list.length] = i;
                }
            })



        iterator = 0;
        return (
            <div>
                {list.map(this.createListItem.bind(this))}
                {/*this.props.takes.map(this.createListItem.bind(this))*/}
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
                    source={take.source}
                    addToListenList={this.props.addToListenList}
                    patchTake={this.props.patchTake}
                    deleteTake={this.props.deleteTake}
                    updateChosenTakeForChunk={this.props.updateChosenTakeForChunk}
                    onClickSave={this.props.onClickSave}
                    deleteComment={this.props.deleteComment}
                />
            </div>
        );
    }
}

TakeList.propTypes = {
    takes: PropTypes.arrayOf(TakePropTypes).isRequired
};

export default TakeList;