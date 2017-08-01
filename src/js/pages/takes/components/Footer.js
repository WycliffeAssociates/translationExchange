import React, {Component} from 'react';
import {Menu, Container, Card, Button} from 'semantic-ui-react'
import AudioComponent from "./AudioComponent"
import config from 'config/config'
import 'css/takes.css'

class Footer extends Component {

    createArray() {
        if (this.props.listenList.length > 0) {
            var takeList = [];
            this.props.listenList.map((i) => {
                takeList[takeList.length] = i.mode + ' ' + i.chunk.startv + ' take ' + i.count
            })
            return takeList
        }
    }

    createListenPlaylist() {


        if (this.props.listenList.length > 0) {
            var playlist = [];
            this.props.listenList.map((i) => {
                playlist[playlist.length] = {
                    "src": config.streamingUrl + i.props.take.location,
                    "name": this.props.mode + ' ' + i.chunk.startv + ' take ' + i.count
                }
            })
            return (
                <Card fluid>
                    <AudioComponent playlist={playlist} />
                </Card>
            );
        }

        else {
            return null;
        }


    }

    onClick() {
        alert('heyo')
    }

    render () {

        this.createArray()
        return (

            <div className="footerStyle">
                <Menu inverted compact secondary>
                    {this.props.currentPlaylist.length > 0
                        ? <Menu.Item>
                            <Card fluid>
                                <AudioComponent playlist={this.props.currentPlaylist}/>
                            </Card>
                          </Menu.Item>
                        : ""
                    }

                    <Menu.Item>
                        {this.createListenPlaylist()}
                    </Menu.Item>

                    <Menu.Item>
                        <Button content="expand" icon="unhide" onClick={this.onClick} />
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

export default Footer;