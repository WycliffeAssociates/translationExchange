import React, { Component } from 'react';
import Audio from 'translation-audio-player';
import marker from './markers.json';
import playlist from './playlist.json';

class About extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>
                This is the about page.

                <Audio
                    width={''}
                    height={''}
                    fullPlayer={false}
                    comment={true}
                    color="#fff"
                    src="https://files.freemusicarchive.org/music%2Fno_curator%2FThe_Womb%2FBang_-_An_Introduction_to_The_Womb%2FThe_Womb_-_02_-_Sex_Club.mp3"
                    markers={marker.markers}
                    markersButton={true}
                    playlist={playlist.playlist}
                    style={{
                        boxShadow: '1px 2px 6px rgba(0, 0, 0, 0.2)',
                        width: '1200px',
                        height: '150px',
                        marginTop: '200px',
                        backgroundColor:'black'
                    }}

                    // store a reference of the audio component
                    ref={(audioComponent) => { this.audioComponent = audioComponent; }}
                />

            </div>
        );
    }
}

export default About;