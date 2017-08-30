import React, {Component} from 'react';
import MarkAsDone from "./MarkAsDone";
import CommentContainer from "./comments/PinkButton"
import {Menu, Container, Card, Button, Icon, Label, Popup, Grid, Divider} from 'semantic-ui-react';
import AudioComponent from "./AudioComponent"
import config from 'config/config'
import 'css/takes.css'
import TakeListenButton from './AddTake'


class Footer extends Component {


constructor(props){
  super(props);


}

componentWillReceiveProps(nextProps){




}



    createArray() {

        if (this.props.listenList.length > 0) {
            var takeList = [];
            this.props.listenList.map((i) => {
                //takeList[takeList.length] = i.mode + ' ' + i.chunk.startv + ' take ' + i.count
                  takeList[takeList.length] = i.mode + ' ' + i.chunk.startv
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
                    //"name": this.props.mode + ' ' + i.chunk.startv + ' take ' + i.count,
                    "name":"take " +
          					this.props.takeNum +
          					", " +
          					this.props.mode +
          					" " +
          					i.chunk.startv +
          					" (" +
          					this.props.author +
          					" on " +
          					this.props.date +
          					")"
                }
            })

            //this.props.playPlaylist(playlist);

            return(playlist);
        }

        else {
            return null;
        }

    }



    render () {


        var icon = <Icon name="plus" size="big" color="blue"/>
        var button = <Button icon={icon} inverted color="blue"/>
        let multipleTakes = false;
        let playList = this.props.currentPlaylist;

        if( this.createArray().length > 0){
            multipleTakes = true;
            playList = this.createListenPlaylist();

           }




        return (

            <div className="footerStyle" style={{width:'100%'}}>
              {this.createArray().length > 0
                  ? <div style={{width:'100%', backgroundColor:'transparent', height: 20 }}>
                      {/* <Label pointing="right" size="huge" basic color="black">Stitched takes</Label> */}



                                  {this.createArray().map((i) => {
                                      return(



                                           <Button inverted color='blue'>{i}</Button>


                                      );
                                  })}



                  </div>
                  : ""
              }
                <Menu inverted secondary>
                    {this.props.currentPlaylist.length > 0
                        ? <Menu.Item style={{width:'100%'}}>
                            <div style={{width:'100%'}}>
                                <AudioComponent
                                    playlist={playList}
                                    width={500}
                                    loop={this.props.audioLoop}
                                    markers={this.props.markers}
                                    showMarkers={true}
                                    multipleTakes={multipleTakes}
                                />
                            </div>
                          </Menu.Item>
                        : ""
                    }


                    {/*
                    <Menu.Item>
                        {this.createListenPlaylist()}
                    </Menu.Item>
                    */}


                </Menu>
            </div>
        );
    }
}

export default Footer;
