import React, { Component } from 'react';
import TakePropTypes from "./components/TakePropTypes";
import axios from 'axios';
import config from "config/config";


import Take from "./components/Take";

class TakeContainer extends Component {

    onMarkedForExportToggled () {
        var markedForExport = !this.props.take.take.is_export;
        console.log("id " + this.props.take.take.id + " marked for export as " + markedForExport);
        console.dir(this.props);

        axios.patch(config.apiUrl + 'takes/' + this.props.take.take.id + '/', {
            "is_export": markedForExport
        }).then((results) => {
            console.log("MARKED FOR EXPORT");
            console.dir(results);
        });
    }

    onRatingSet (newRating) {
        console.log("new rating for take " + this.props.take.take.id + ": " + newRating);
        //would do an AJAX request here to update rating on this take using its id...
    }

    //other functions here for dealing with new audio comments recorded, etc

    render () {

        return (
            <Take count={this.props.count}
                  take={this.props.take.take}
                  author={this.props.take.user}
                  onRatingSet={this.onRatingSet.bind(this)}
                  onMarkedForExportToggled={this.onMarkedForExportToggled.bind(this)}/>
                //other events that require requesting the server would go here
        );
    }
}

TakeContainer.propTypes = {
    take: TakePropTypes
};

export default TakeContainer;