import React, {Component} from 'react';
import {Menu, Card, Icon, Label, Popup, Grid, Divider} from 'semantic-ui-react'
import AudioComponent from "./AudioComponent"
import config from 'config/config'
import 'css/takes.css'
import TakeListenButton from './AddTake'

class Footer extends Component {

    createArray() {
        if (this.props.listenList.length > 0) {
            let takeList = [];
            this.props.listenList.map((i) => {
                takeList[takeList.length] = i.mode + ' ' + i.chunk.startv + ' take ' + i.count
            });
            return takeList
        }
        else {
            return []
        }
    }

    createListenPlaylist() {
        if (this.props.listenList.length > 0) {
            let playlist = [];
            this.props.listenList.map((i) => {
                playlist[playlist.length] = {
                    "src": config.streamingUrl + i.props.take.location,
                    "name": this.props.mode + ' ' + i.chunk.startv + ' take ' + i.count
                }
            });
            this.props.playPlaylist(playlist)
        }
        else {
            return null;
        }
    }

    render () {

        let icon = <Icon name="plus" size="big" color="blue"/>;

        return (
            <div className="footerStyle">
                <Menu inverted secondary>
                    {this.props.currentPlaylist.length > 0
                        ? <Menu.Item>
                            <Card fluid>
                                <AudioComponent playlist={this.props.currentPlaylist} width={500} loop={this.props.audioLoop}/>
                            </Card>
                          </Menu.Item>
                        : ""
                    }

                    {this.createArray().length > 0
                        ? <Menu.Item position="right">
                            <Label pointing="right" size="huge" basic color="black">Stitched takes</Label>

                            <Popup inverted trigger={icon} hoverable size="large">
                                <Grid inverted divided>
                                    <Grid.Column divided>
                                        <Grid.Row verticalAlign="middle">
                                            <TakeListenButton onClick={this.createListenPlaylist.bind(this)} /> Play All
                                        </Grid.Row>
                                        {this.createArray().map((i) => {
                                            return(
                                                <div>
                                                    <Divider />
                                                <Grid.Row>{i} </Grid.Row>
                                                </div>
                                            );
                                        })}
                                    </Grid.Column>
                                </Grid>
                            </Popup>

                        </Menu.Item>
                        : ""
                    }
                </Menu>
            </div>
        );
    }
}

export default Footer;