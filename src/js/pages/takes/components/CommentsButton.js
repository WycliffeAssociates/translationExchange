/**
 * Created by ericazhong on 7/18/17.
 */
/* global state show */
import React from 'react';
import {Button, Modal} from "semantic-ui-react";
import { Icon } from 'semantic-ui-react'
import Audio from 'translation-audio-player'
import playlist from './songs/playlist.json'

let state;
let show;
let close;
var iterator;
let close;

class CommentsButton extends React.Component {
    state = {open: false};
    //get the comments for a take

    //make a playlist of song objects here of comments for that take

    //map song objects to Audio components, and display those song objects
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

    createListItem (take) {
        iterator += 1;

        return (
            <div>
                <Audio
                    width={600}
                    height={300}
                    playlist={take}

                    // store a reference of the audio component
                    ref={audioComponent => { this.audioComponent = audioComponent; }}
                />
            </div>
        );
    }


    show = (size) => () => this.setState({ size, open: true });
    close = () => this.setState({ open: false });

    render()
    {
        const { open, size } = this.state;
        iterator = 0;
        return (
            <div>

                {/*<div>*/}
                    {/*{listOfComments.map(this.createListItem.bind(this))}*/}
                {/*</div>*/}


                <Button icon color="blue" onClick={this.show('mini')}>
                    <Icon name='announcement' size="large"/>
                </Button>


                <Modal size={size} open={open} onClose={this.close} closeIcon="close">
                    <Modal.Header>
                        Comments
                    </Modal.Header>
                    <Modal.Content>
                        {/*this should be replaced with listOfComments, a list of Audio components*/}
                        <Audio
                            width={600}
                            height={300}
                            playlist={playlist.playlist}

                            // store a reference of the audio component
                            ref={audioComponent => { this.audioComponent = audioComponent; }}
                        />


                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}

export default CommentsButton