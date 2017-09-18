import React, {Component} from 'react';
import { connect } from "react-redux";
import MarkAsDone from "./MarkAsDone";
import CommentContainer from "./comments/PinkButton"
import {Menu, Container, Card, Button, Icon, Label, Popup, Grid, Divider} from 'semantic-ui-react';
import AudioComponent from "./AudioComponent"
import AudioPlayer from './audioplayer/AudioPlayer'; // replace for audioComponent and verify that the waveform is updating
import config from 'config/config'
import 'css/takes.css'
import TakeListenButton from './AddTake'


class Footer extends Component {


constructor(props){
  super(props);
  this.state = {
      author:this.props.author,
      date: this.props.date,

  };

}

componentWillReceiveProps(nextProps){
  this.state = {
      author:nextProps.author,
      date: nextProps.date

  };


}




    createArray() {


        if (this.props.listenList.length > 0) {
            var takeList = [];
            this.props.listenList.map((i) => {

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
                    "markers": i.props.take.markers,
                    "src": config.streamingUrl + i.props.take.location,
                    //"name": this.props.mode + ' ' + i.chunk.startv + ' take ' + i.count,
                    "name":
          					this.props.mode +
          					" " +
          					i.chunk.startv +
          					" (" +
          					this.state.author +
          					" on " +
          					this.parseDate(i.props.take.date_modified) +
          					")"
                }
            })




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

        if( this.createArray().length > 1){

            playList = this.createListenPlaylist();
         }




        return (

            <div className="footerStyle" style={{width:'100%'}}>
              {this.createArray().length > 0
                  ? <div style={{width:'100%', backgroundColor:'transparent', height: 20 }}>




                                  {this.props.playlist.map((i) => {
                                      return(

                                           <Button inverted color='blue'>{i}</Button>


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
                                    //playlist={playList}
                                />
                            </div>
                          </Menu.Item>
                        : ""
                    }


                </Menu>
            </div>
        );


    }


    parseDate(date) {
      var noon = "am";
      var dateArr = date.split("T");
      var date = dateArr[0];

      var time = dateArr[1].split(".");
      time = time[0].split(":");
      date = date.split("-");
      switch (date[1]) {
        case "01":
          date[1] = "January";
          break;
        case "02":
          date[1] = "February";
          break;
        case "03":
          date[1] = "March";
          break;
        case "04":
          date[1] = "April";
          break;
        case "05":
          date[1] = "May";
          break;
        case "06":
          date[1] = "June";
          break;
        case "07":
          date[1] = "July";
          break;
        case "08":
          date[1] = "August";
          break;
        case "09":
          date[1] = "September";
          break;
        case "10":
          date[1] = "October";
          break;
        case "11":
          date[1] = "November";
          break;
        case "12":
          date[1] = "December";
          break;
      }

      var hour = parseInt(time[0]);
      if (hour / 12 > -1) {
        noon = "pm";
      }

      if (!(hour % 12 === 0)) {
        hour %= 12;
      }

      return (
        date[1] +
        " " +
        date[2] +
        ", " +
        date[0] +
        " at " +
        hour +
        ":" +
        time[1] +
        noon
      );
    }





}




const mapStateToProps = state => {

const{ mode, playlist } = state.updatePlaylist;

return{ mode, playlist };

}





export default connect(mapStateToProps)(Footer);
