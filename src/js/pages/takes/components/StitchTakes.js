import React, {Component} from 'react';
import PropTypes from "prop-types";
import { Accordion, Icon } from 'semantic-ui-react'
import AudioComponent from './AudioComponent'
import config from "config/config";

class StitchTakes extends Component {

    buildTempListener() {

        if (this.props.listenList.length > 0) {
            return(

                <Accordion styled fluid>
                    <Accordion.Title>
                        <Icon name="dropdown" />
                        Listen to Selected
                    </Accordion.Title>

                    <Accordion.Content>
                        <AudioComponent
                            playlist={this.createListenPlaylist()}
                        />
                    </Accordion.Content>

                </Accordion>

            );
        }
    }

    createListenPlaylist() {
        var playlist = [];

        for (let i = 0; i < this.props.listenList.length; i++) {
            playlist[playlist.length] = {
                "src": config.streamingUrl + this.props.listenList[i].props.take.location,
                "name": this.props.listenList[i].props.take.mode + ' ' + this.props.listenList[i].props.take.startv + ' (' +
                (playlist.length + 1) + '/' + this.props.listenList.length + ')'
            }
        }

        return playlist

    }

    render () {
        return (
            <div>
                {this.buildTempListener()}
            </div>
        );
    }
}

StitchTakes.propTypes = {
    listenList: PropTypes.array.isRequired
};

export default StitchTakes;