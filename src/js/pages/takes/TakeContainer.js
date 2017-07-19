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
            isToggleOn: true
        };
    }

    onMarkedForExportToggled () {
        var markedForExport = !this.props.take.take.is_export;

        axios.patch(config.apiUrl + 'takes/' + this.props.take.take.id + '/', {
            "is_export": markedForExport
        }).then((results) => {
            //update this take in state using the update method in ChapterContainer
            var updatedTake = _.cloneDeep(this.props.take);
            updatedTake.take = results.data;
            this.props.updateTakeInState(updatedTake);
        });
    }

    onRatingSet (newRating) {
        console.log("new rating for take " + this.props.take.take.id + ": " + newRating);
        // var markedForExport = !this.props.take.take.is_export;
        //
        // axios.patch(config.apiUrl + 'takes/' + this.props.take.take.id + '/', {
        //     "is_export": markedForExport
        // }).then((results) => {
        //     //update this take in state using the update method in ChapterContainer
        //     var updatedRating = _.cloneDeep(this.props.take);
        //     updatedRating.take = results.data;
        //     this.props.updateTakeInState(updatedRating);
        // });

        axios.patch(config.apiUrl + '/takes/' + this.props.take.take.id + '/', newRating, {"rating": newRating})
        //ld do an AJAX request here to update rating on this take using its id...
    }

    render () {
        return (
            <Take count={this.props.count}
                  take={this.props.take.take}
                  author={this.props.take.user}
                  onRatingSet={this.onRatingSet.bind(this)}
                  onMarkedForExportToggled={this.onMarkedForExportToggled.bind(this)}
                  source={this.props.source}
            />
                //other events that require requesting the server would go here
        );
    }
}

TakeContainer.propTypes = {
    take: TakePropTypes
};

export default TakeContainer;