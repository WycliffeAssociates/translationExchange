import React, {Component} from 'react';
import MarkAsDone from "./MarkAsDone";
import CommentContainer from "./comments/CommentContainer"
import {Menu} from 'semantic-ui-react'
import AudioComponent from "./AudioComponent"
import config from 'config/config'

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
                <AudioComponent playlist={playlist} width={700}/>
            );
        }

    }

    render () {
        return (

            <Menu>

                    {this.createListenPlaylist()}



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
        );
    }
}

export default Footer;