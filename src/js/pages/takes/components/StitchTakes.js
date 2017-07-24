import React, {Component} from 'react';
import PropTypes from "prop-types";
import { Accordion, Icon, Button, Grid} from 'semantic-ui-react'
import AudioComponent from './AudioComponent'
import config from "config/config";

class StitchTakes extends Component {

    constructor(props) {
        super (props);
        this.state = {
          isToggleOn: false
        };
    }

    handleClick() {
        this.setState({isToggleOn: !this.state.isToggleOn});
    }

    buildTempListener() {

        if (this.props.listenList.length > 0) {
            return(
                <Accordion styled fluid>
                    <Accordion.Title>
                        <Icon name="dropdown" />
                        Listen to Selected
                    </Accordion.Title>
                    <Accordion.Content>
                        <Grid relaxedclassName="take" columns={2} >

                            <Grid.Column width={6}>
                            </Grid.Column>
                            {this.props.listenList[0].props.source
                                ?
                                <Grid.Column>
                                    <Button content='Source Audio' onClick={(e) => this.handleClick()}
                                            icon='right arrow' labelPosition='right'/>
                                </Grid.Column>
                                : ""
                            }

                        </Grid>

                        <Grid relaxedclassName="take" columns={2}>

                            <Grid.Column width={9}>
                                <AudioComponent playlist={this.createListenPlaylist()} width={700}/>
                            </Grid.Column>

                            {this.state.isToggleOn
                                ?
                                <Grid.Column width={4}>
                                    <AudioComponent playlist={this.createSourcePlaylist()} width={200}/>
                                </Grid.Column>
                                : ""
                            }

                        </Grid>


                    </Accordion.Content>
                </Accordion>
            );
        }
    }

    createListenPlaylist() {
        var playlist = [];
        this.props.listenList.map((i) => {
            playlist[playlist.length] = {
                "src": config.streamingUrl + i.props.take.location,
                "name": i.props.take.mode + ' ' + i.props.take.startv + ' (' + (playlist.length+1) + '/' + this.props.listenList.length + ')'
            }
        })
        return playlist
    }

    createSourcePlaylist() { // works
        let sourcePlaylist = []
        this.props.listenList.map((i) => {
            if(i.props.take.source_language_id !== null) {
                sourcePlaylist[sourcePlaylist.length] = {
                    "src": config.streamingUrl + i.props.source.take.location,
                    "name": i.props.take.mode + ' ' + i.props.take.startv + ' (' + (sourcePlaylist.length+1) + '/' + this.props.listenList.length + ')'
                }
            }
        })

        return sourcePlaylist
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