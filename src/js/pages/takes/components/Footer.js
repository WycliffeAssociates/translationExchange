import React, {Component} from 'react';
import MarkAsDone from "./MarkAsDone";
import CommentContainer from "./comments/PinkButton"
import {Menu, Container, Card, Button, Icon, Label} from 'semantic-ui-react'
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
        else {
            return []
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
                    <AudioComponent playlist={playlist} width={700}/>
                </Card>
            );
        }

        else {
            return (
                <h2>Select a chunk to play</h2>
            );
        }


    }

    onClick() {
        alert('heyo')
    }

    render () {

        var icon = <Icon name="plus" size="huge" color="blue" onClick={this.onClick} />

        this.createArray()
        return (

            <div className="footerStyle">
                <Menu inverted secondary>
                    {this.props.currentPlaylist.length > 0
                        ? <Menu.Item>
                            <Card fluid>
                                <AudioComponent playlist={this.props.currentPlaylist} width={500}/>
                            </Card>
                          </Menu.Item>
                        : ""
                    }

                    {/*
                    <Menu.Item>
                        {this.createListenPlaylist()}
                    </Menu.Item>
                    */}

                    {this.createArray().length > 0
                        ? <Menu.Item position="right">
                            <Label pointing="right" size="huge" basic color="black">Click here to see your stitched takes</Label>
                            <Button icon={icon} basic onClick={this.onClick}/>
                        </Menu.Item>
                        : ""
                    }
                </Menu>
            </div>
        );
    }
}

export default Footer;