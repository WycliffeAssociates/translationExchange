import React, { Component } from 'react';
import AudioPlayer from '../../../shared/AudioPlayer';
import TakePropTypes from "./TakePropTypes";
import TakeRating from "./TakeRating.js";

import AudioComponent from './AudioComponent'

var aSrc = 'https://files.freemusicarchive.org/music%2Fno_curator%2FThe_Womb%2FBang_-_An_Introduction_to_The_Womb%2FThe_Womb_-_02_-_Sex_Club.mp3'
var aName = "Take 'A'"


class TakeContainer extends Component {
    onRatingSet (newRating) {
        console.log("new rating for take " + this.props.take.id + ": " + newRating);
        //would do an AJAX request here to update rating on this take using its id...
    }

    //other functions here for dealing with new audio comments recorded, etc

    render () {

        return (

            <div className="take">
                <br />
                <strong>Take by {this.props.take.author} on {this.props.take.timestamp}</strong>
                <TakeRating rating={this.props.take.rating} onChange={this.onRatingSet.bind(this)}/>
                <AudioComponent name={'Rating: ' + this.props.take.rating + '/3'} src={this.props.take.audioSource} />
                <br />
                <br />
            </div>

        );
    }
}

TakeContainer.propTypes = {
    take: TakePropTypes
};

export default TakeContainer;
