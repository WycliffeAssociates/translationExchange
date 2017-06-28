import React, { Component } from 'react';
import AudioPlayer from '../AudioPlayer';

class Take extends Component {
    render () {
        return (
            <div className="take">
                I am a take...
                <AudioPlayer audioSource={this.props.audioSource}/>
                <div className="takeAuthor">Author: {this.props.author}</div>
                <div className="takeRating">Rating: {this.props.rating}</div>
                <div className="takeTimestamp">Timestamp: {this.props.timestamp}</div>
            </div>
        );
    }
}

export default Take;
