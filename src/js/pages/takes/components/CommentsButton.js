/**
 * Created by ericazhong on 7/18/17.
 */
import React from 'react';
import {Button, Modal} from "semantic-ui-react";
import { Icon } from 'semantic-ui-react'
import Audio from 'translation-audio-player'
import playlist from './songs/playlist.json'
class CommentsButton extends React.Component {
    state = {open: false};


    //make a playlist here of comments for that take
    createPlaylist() {
        var playlist = [];
        for (let i=0; i<this.props.comments.length; i++){
            playlist[playlist.length] = {
                "src": this.props.comments[i].comment.location,
                 "name": 'comment' + i
            }
        }
        return playlist
    }
   //  createPlaylist() {
   // //  playlist = this.props.comments.map((comment) => {
   // //          "src" :config.streamingUrl + comment.comment.location,
   // //              "name": 'name'
   // //      })
   // //
   // // };
   //       var file = [];
   //  //
   //      for(let i = 0; i < this.props.comments.length; i++) {
   //
   //              file[file.length] = {
   //                  "src": config.streamingUrl + comment.comment.location,
   //                  "name": 'name'
   //
   //          }
   //      }
   //
   //      return file
   //  }


    show = (size) => () => this.setState({ size, open: true });
    close = () => this.setState({ open: false });

    render() {
        //console.log(this.props.comments[0].comment.location);
        console.log('playlist', this.createPlaylist());

        const { open, size } = this.state;

        return (
            <div>
                <Button icon color="blue" onClick={this.show('mini')}>
                    <Icon name='announcement' size="large"/>
                </Button>


                <Modal size={size} open={open} onClose={this.close}>
                    <Modal.Header>
                        Comments
                    </Modal.Header>
                    <Modal.Content>

                        <Audio
                            width={600}
                            height={300}
                            playlist={playlist.playlist}

                            // store a reference of the audio component
                            ref={audioComponent => { this.audioComponent = audioComponent; }}
                        />

                    </Modal.Content>

                    <Modal.Actions>
                        <Button positive icon='checkmark' labelPosition='right' content='Done' onClick={this.close}/>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

export default CommentsButton