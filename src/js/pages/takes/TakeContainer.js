import React, { Component } from 'react';
import TakePropTypes from "./components/TakePropTypes";
import axios from 'axios';
import config from "../../../config/config";
import {Button, Grid, Segment} from "semantic-ui-react";
import _ from 'lodash';
import Take from "./components/Take";


class TakeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: true,
            ratingLoading: false
        };
    }

    onMarkedForExportToggled () {
        var markedForExport = !this.props.take.take.is_export;
        this.props.patchTake(this.props.take.take.id,
            {is_export: markedForExport},
            () => { //success callback
                if (markedForExport) {
                    this.props.updateChosenTakeForChunk(this.props.take.take.id);
                }
        });
    }

    onRatingSet (newRating) {
        this.setState({ratingLoading: true});
        this.props.patchTake(this.props.take.take.id,
            {rating: newRating},
            () => {
                this.setState({ratingLoading: false});
        });
    }

    onDeleteTake () {
        this.props.deleteTake(this.props.take.take.id);
    }

    render () {

        return (
            <Take count={this.props.count}
                  take={this.props.take.take}
                  author={this.props.take.user}
                  ratingLoading={this.state.ratingLoading}
                  onRatingSet={this.onRatingSet.bind(this)}
                  onMarkedForExportToggled={this.onMarkedForExportToggled.bind(this)}
                  source={this.props.source}
                  comments={this.props.take.comments}
                  addToListenList={this.props.addToListenList}
                  onDeleteTake={this.onDeleteTake.bind(this)}
            />
                //other events that require requesting the server would go here
        );
    }
}

TakeContainer.propTypes = {
    take: TakePropTypes
};

export default TakeContainer;