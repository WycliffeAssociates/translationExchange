/**
 * Created by ericazhong on 7/18/17.
 */
import React from 'react';
import {Button, Modal} from "semantic-ui-react";
import { Icon } from 'semantic-ui-react'
import playlist from "/Users/ericazhong/Documents/8woc2017/src/js/pages/takes/components/songs/playlist.json"
import Audio from 'translation-audio-player'
class CommentsButton extends React.Component{
    state = { open: false };

    show = (size) => () => this.setState({ size, open: true });
    close = () => this.setState({ open: false });

    render() {
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