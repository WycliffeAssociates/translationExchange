import React, { Component } from 'react';
import AudioPlayer from '../../../shared/AudioPlayer';
import TakePropTypes from "./TakePropTypes";
import TakeRating from "./TakeRating.js";

class TakeContainer extends Component {
    onRatingSet (newRating) {
        console.log("new rating for take " + this.props.take.id + ": " + newRating);
        //would do an AJAX request here to update rating on this take using its id...
    }

    //other functions here for dealing with new audio comments recorded, etc

    render () {
        return (
            <div className="take">
                <strong>Take by {this.props.take.author} on {this.props.take.timestamp}</strong>
                <AudioPlayer audioSource={this.props.take.audioSource}/>
                <TakeRating rating={this.props.take.rating} onChange={this.onRatingSet.bind(this)}/>
            </div>
        );
    }
}

TakeContainer.propTypes = {
    take: TakePropTypes
};

export default TakeContainer;
