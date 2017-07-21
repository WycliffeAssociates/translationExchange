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

        axios.patch(config.apiUrl + 'takes/' + this.props.take.take.id + '/', {
            "is_export": markedForExport
        }).then((results) => {
            //update this take in state using the update method in ChapterContainer
            var updatedTake = _.cloneDeep(this.props.take);
            updatedTake.take = results.data;
            this.props.updateTakeInState(updatedTake);
        });

        //if this one was marked for export, then ask the higher level chunk
        //to make sure no other takes in this chunk are marked for export
          if (markedForExport) {
            this.props.updateTakeToExport(this.props.take.take.id);
          }
    }

    onRatingSet (newRating) {
        this.setState({ratingLoading: true});
        axios.patch(config.apiUrl + 'takes/' + this.props.take.take.id + '/',
            {"rating": newRating}
        )  .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }).then((results) => {
            //update this take in state using the update method in ChapterContainer
            var updatedTake = _.cloneDeep(this.props.take);
            updatedTake.take = results.data;
            this.props.updateTakeInState(updatedTake);
            this.setState({ratingLoading: false});
        });
    }//TODO catch error with axios

    onDeleteTake () {
        console.log("onDeleteTake");
        axios.delete(config.apiUrl + 'takes/' + this.props.take.take.id + '/')
            .then((result) => {
                this.props.deleteTakeFromState(this.props.take.take.id);
            }).catch((exception) => {
                console.log(exception);
        });
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