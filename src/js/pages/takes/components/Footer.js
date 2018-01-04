import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Menu, Button } from 'semantic-ui-react';
import AudioPlayer from './audioplayer/AudioPlayer';
import 'css/takes.css'
import { resetAudioPlayer, showPlayer, stopAudio } from './../../../actions';


class Footer extends Component {

    componentWillUnmount() {
        this.props.resetAudioPlayer();
    }

    hidePlayer(){
        this.props.showPlayer(false);
        this.props.stopAudio();

    }

    render() {
        return (
            <div className="footerStyle" style={{ width: '100%', direction: "ltr" }}>
                {this.props.playlist.length > 0 && this.props.playlistMode
                    ? <div style={{ width: '100%', backgroundColor: 'transparent', height: 20 }}>
                        {this.props.playlist.map((i) => {
                            return (

                                <Button inverted color='blue'>{i.chunk}</Button>
                                //<button style={{backgroundColor: 'transparent', color: '3791D5'}} >{i.chunk}</button>
                            );
                        })}
                    </div>
                    : ""
                }
                <Menu inverted secondary>
                    {this.props.playlist.length > 0 && this.props.displayPlayer
                        ? <Menu.Item style={{ width: '100%' }}>

                            <div style={{ width: '100%' }}>
                                <div style={{display: 'flex', justifyContent: 'flex-end', marginRight:'2.6%'}}>
                                    <Button color='red' icon='close' onClick={()=>this.hidePlayer()}/>
                                </div>
                                <AudioPlayer
                                />
                            </div>
                        </Menu.Item>
                        : ""
                    }

                </Menu>
            </div>
        );


    }

}


const mapStateToProps = state => {
    const { playlist, playlistMode, displayPlayer } = state.updatePlaylist;

    return { playlist, playlistMode, displayPlayer };
};

const mapDispatchToProps = dispatch => {

    return bindActionCreators({ resetAudioPlayer, showPlayer, stopAudio }, dispatch);

};



export default connect(mapStateToProps, mapDispatchToProps)(Footer);
