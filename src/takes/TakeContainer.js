import React, { Component } from 'react';
import Take from "./Take";

class TakeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            audioSource: "",
            author: "",
            rating: null,
            timestamp: null
        };
    }

    componentDidMount() {
        //request take info from server...
        this.setState({
            audioSource: "test.wav",
            author: "Bob the Translator",
            rating: 3,
            timestamp: "4:05 pm"
        });
    }

    render() {
        return (
            <div>
                <Take
                    audioSource={this.state.audioSource}
                    author={this.state.author}
                    rating={this.state.rating}
                    timestamp={this.state.timestamp}
                />
            </div>
        );
    }
}

export default TakeContainer;