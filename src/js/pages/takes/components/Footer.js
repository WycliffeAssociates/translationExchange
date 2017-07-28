import React, {Component} from 'react';
import MarkAsDone from "./MarkAsDone";
import CommentContainer from "./comments/PinkButton"
import {Menu, Container, Card} from 'semantic-ui-react'
import AudioComponent from "./AudioComponent"
import config from 'config/config'
import 'css/takes.css'

class Footer extends Component {

    createListenPlaylist() {


        if (this.props.listenList.length > 0) {
            var playlist = [];
            this.props.listenList.map((i) => {
                playlist[playlist.length] = {
                    "src": config.streamingUrl + i.props.take.location,
                    "name": this.props.mode + ' ' + i.chunk.startv + ' (' + (playlist.length + 1) + '/' + this.props.listenList.length + ')'
                }
            })
            return (
                <Card fluid>
                    <AudioComponent playlist={playlist} width={500}/>
                </Card>
            );
        }

        else {
            return (
                <h2>Select a chunk to play</h2>
            );
        }


    }

    render () {
        return (
            <div>
                <Container fluid className="blackBar" />
                <Menu compact secondary>
                    {this.props.currentPlaylist.length > 0
                        ? <Menu.Item>
                            <Card fluid>
                                <AudioComponent playlist={this.props.currentPlaylist} width={800}/>
                            </Card>
                          </Menu.Item>
                        : ""
                    }

                    {/*<Menu.Item>*/}
                        {/*{this.createListenPlaylist()}*/}
                    {/*</Menu.Item>*/}
                </Menu>
            </div>
        );
    }
}

export default Footer;