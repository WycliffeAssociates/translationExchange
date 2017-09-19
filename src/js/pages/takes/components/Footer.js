import React, {Component} from 'react';
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import MarkAsDone from "./MarkAsDone";
import CommentContainer from "./comments/PinkButton"
import {Menu, Container, Card, Button, Icon, Label, Popup, Grid, Divider, Transition} from 'semantic-ui-react';
import AudioComponent from "./AudioComponent"
import AudioPlayer from './audioplayer/AudioPlayer'; // replace for audioComponent and verify that the waveform is updating
import config from 'config/config'
import 'css/takes.css'
import TakeListenButton from './AddTake'
import {resetAudioPlayer} from './../../../actions';


class Footer extends Component {

  componentWillUnmount() {
          this.props.resetAudioPlayer();
      }

    render () {


        var icon = <Icon name="plus" size="big" color="blue"/>

        return (

            <div className="footerStyle" style={{width:'100%'}}>
              {this.props.playlist.length > 0 && this.props.playlistMode
                  ? <div style={{width:'100%', backgroundColor:'transparent', height: 20 }}>
                                  {this.props.playlist.map((i) => {
                                      return(

                                            <Button inverted color='blue'>{i.chunk}</Button>
                                        //<button style={{backgroundColor: 'transparent', color: '3791D5'}} >{i.chunk}</button>

                                      );
                                  })}



                  </div>
                  : ""
              }
                <Menu inverted secondary>
                    {this.props.playlist.length > 0
                        ? <Menu.Item style={{width:'100%'}}>

                            <div style={{width:'100%'}}>
                                <AudioComponent

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
      const{ mode, playlist, playlistMode } = state.updatePlaylist;

      return{ mode, playlist, playlistMode };
};

const mapDispatchToProps = dispatch => {

  return bindActionCreators({resetAudioPlayer}, dispatch);

};



export default connect(mapStateToProps, mapDispatchToProps)(Footer);
