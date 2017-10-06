import React, {Component} from 'react';
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import {Menu, Button} from 'semantic-ui-react';
import AudioPlayer from './audioplayer/AudioPlayer';
import 'css/takes.css'
import {resetAudioPlayer} from './../../../actions';


class Footer extends Component {

  componentWillUnmount() {
          this.props.resetAudioPlayer();
      }

    render () {




        return (

            <div className="footerStyle" style={{width:'100%', direction:"ltr"}}>
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
      const{ mode, playlist, playlistMode } = state.updatePlaylist;

      return{ mode, playlist, playlistMode };
};

const mapDispatchToProps = dispatch => {

  return bindActionCreators({resetAudioPlayer}, dispatch);

};



export default connect(mapStateToProps, mapDispatchToProps)(Footer);
