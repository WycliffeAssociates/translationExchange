import React, {Component} from 'react';
import MarkAsDone from "./MarkAsDone";
import CommentContainer from "./comments/CommentContainer"
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

    render () {
        return (
            <div>
                <Menu compact secondary>

                    <Menu.Item>
                        {this.createListenPlaylist()}
                    </Menu.Item>
                </Menu>

                {/*
                <Menu secondary>
                    <Menu.Item position="right">
                        <CommentContainer
                            ref={instance => (this.commentContainer = instance)}/>
                        <MarkAsDone chapter={this.props.chapter}
                                    book={this.props.book}
                                    language={this.props.language}
                                    chunks={this.props.chunks}
                                    mode={this.props.mode}
                        />
                    </Menu.Item>
                 </Menu>
                 */}
            </div>
        );
    }
}

export default Footer;