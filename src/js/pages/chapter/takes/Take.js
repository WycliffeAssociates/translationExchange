import React, { Component } from 'react';
import AudioPlayer from '../../../audio player/AudioPlayer';
import TakePropTypes from "./TakePropTypes";

class Take extends Component {
    render () {
        return (
            <div className="take">
                <strong>I am a take...</strong>
                <AudioPlayer audioSource={this.props.take.audioSource}/>
                <div className="takeAuthor">Author: {this.props.take.author}</div>
                <div className="takeRating">Rating: {this.props.take.rating}</div>
                <div className="takeTimestamp">Timestamp: {this.props.take.timestamp}</div>
            </div>
        );
    }
}

Take.propTypes = {
    take: TakePropTypes
};

export default Take;
