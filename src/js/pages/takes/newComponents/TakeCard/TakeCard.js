import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import jdenticon from 'jdenticon';
import TopBar from './TakeCardComponents/TakeCardTopIcon';
import BottomButtons from './TakeCardComponents/TakeCardBottomButtons';
import Comments from './TakeCardComponents/TakeCardComments';
import Waveform from '../../components/audioplayer/Waveform';
import Marker from '../../components/audioplayer/Markers';
import {connect} from 'react-redux';
import config from 'config/config';
import { addToPlaylist, playTake, multipleTakes, clearPlaylist, removeTakeFromPlaylist, stopAudio, updateTime, playAudio, getComments  } from '../../../../actions';
import { bindActionCreators } from 'redux';


export class TakeCard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showComments: false,
      takePlaying: false,
      recording: false,
      blob: '',
      isToggleOn: true,
      showMarkers: true,
      showMarkersColor: '',
      clear: true,
      hash: 'randomhash4324',
      playingComment: false,
      marker: 0,
      markerClicked: false,
    };

    this.expandComments = this.expandComments.bind(this);
    this.onStop = this.onStop.bind(this);
    this.playComment = this.playComment.bind(this);
    this.recordComment =  this.recordComment.bind(this);
    this.finishedPlaying = this.finishedPlaying.bind(this);
    this.callMarker = this.callMarker.bind(this);

  }

  componentDidMount() {
    console.log(this.props);
    const { take }= this.props;
    this.props.getComments(take.id, 'take_id', take.order);

    jdenticon.update('#user',this.props.users.loggedInUser? this.props.users.loggedInUser: 'random');
    jdenticon.update('#comment','imthemaster');

  }

  componentDidUpdate() {
    jdenticon.update('#comment','imthemaster');
  }

  expandComments() {
    this.setState(prevState => ({ showComments: !prevState.showComments}));
  }

  onStop(recordedBlob) {
    console.log(recordedBlob);
    this.setState({blob: recordedBlob.blobURL});

  }
  finishedPlaying() {
    this.setState({takePlaying: false});
    console.log(this.state.takePlaying, 'finished Playing');
  }

  playTakeFromCard() {
    this.setState(prevState => ({takePlaying: !prevState.takePlaying}));
  }

  playComment() {
    this.setState(prevState => ({playingComment: !prevState.playingComment}));
  }


  recordComment() {
    this.setState(prevState => ({recording: !prevState.recording}));
  }

  callMarker() {
    const markerArray = [];

    let receivedMarkersString = this.props.take.markers;

    console.log(receivedMarkersString, 'received marker string');
    let receivedMarkerObject = JSON.parse(receivedMarkersString);
    console.log(receivedMarkerObject);

    for (const key in receivedMarkerObject) {
      console.log(receivedMarkerObject[key]);
      const position = (receivedMarkerObject[key] / 44100);
      const finalPosition = (position/this.props.take.duration)*100;
      console.log(finalPosition, 'finalPositionFORMARKERS');
      // calculate the position of the marker
      // by dividing the marker position from the props, by the duration of the take
      // * by 100 and use that percatage to place the marker on the card in correct place
      // offset by 4 to account for the padding inside the taskList. If remove 4, marker moves all the way to the left
      //of the container, beyond the take card.
      console.log(finalPosition);
      markerArray.push(
        <Marker
          style={{ overflow: 'visible' }}
          visibility={true}
          translate={finalPosition}
          text={key}
          key = {key}
          dragPosition={this.dragPosition}
        />);
    }

    console.log(markerArray, 'Marker Array');
    return (
      markerArray
    );
  }




  render() {
    let markers ='';
    console.log(this.props, 'PROPS FROM TAKE CARD');

    if (this.state.showMarkers) {
      markers = this.callMarker();
    }

    return (
      <Container>
        <TopBar {...this.props} />


        {markers}
        <WaveformContainer>
          <Waveform
            audioFile={config.streamingUrl+this.props.take.location}  playAudio={this.props.play}
            playing = {this.state.takePlaying} durationTime={this.props.take.duration}
            //updateTime = {this.updateTime}
            //initialWidth = {this.initialWidth}
            options= {{ cursorWidth: 2, progressColor: '#009CFF', cursorColor: '#E74C3C', barWidth: 1, hideScrollbar: true, normalize: true, height: 35, waveColor: '#969595' }}
            markerPosition={this.state.marker} markerClicked={this.state.markerClicked}
            resetMarkerClicked={this.resetMarkerClicked} finishedPlaying={this.finishedPlaying}
          />
        </WaveformContainer>

        <BottomButtons {...this.props} takePlaying= {this.state.takePlaying} playTakeFromCard = {() => this.playTakeFromCard()} expandComments={() => this.expandComments()} />


        {this.state.showComments? <Comments playComment = {()=> this.playComment()} playingComment={this.state.playingComment}
          blob={this.state.blob} recording={this.state.recording} {...this.props}
          recordComment = {()=> this.recordComment()} onStop={this.onStop} /> : '' }
      </Container>

    );
  }

  moveLeft() {
    if (this.props.take.is_publish) {
      this.props.onMarkedForExportToggled();
    } else if (this.props.take.rating > 1) {
      this.props.onRatingSet(this.props.take.rating - 1);
    }
  }

  moveRight() {
    if (this.props.take.rating >= 3) {
      this.props.onMarkedForExportToggled();
    } else if (this.props.take.rating < 1) {
      this.props.onRatingSet(2);
    } else {
      this.props.onRatingSet(this.props.take.rating + 1);
    }
  }

  getTakeInfo() {
    const takeLoc = this.props.take.location;
    const takeNum = this.props.count;
    const startv = this.props.chunkNumber;
    const author =  'author';    // TODO include autor from backend this.props.author.name;
    const date = this.parseDate(this.props.take.date_modified);
    const markers = this.props.take.markers;

    let take = {
      src: config.streamingUrl + takeLoc,
      markers: markers,
      name: `${this.props.displayText.take} ${takeNum}, ${this.props.displayText.chunk} ${startv}  (${author} ${this.props.displayText.on} ${date})`,  // in case of other mode like chunk mode or verse mode verify this
      id: takeLoc,
      chunk: `${this.props.displayText.chunk} ${startv}`,          // in case of a different mode like segment or verse here is assumed that only chunks will be used
    };
    return take;
  }

  parseDate(dateReceived) {

    let noon = 'am';
    let dateArr = dateReceived.split('T');
    let date = dateArr[0];

    var time = dateArr[1].split('.');
    time = time[0].split(':');
    date = date.split('-');
    switch (date[1]) {
      case '01':
        date[1] = this.props.displayText.month1;
        break;
      case '02':
        date[1] = this.props.displayText.month2;
        break;
      case '03':
        date[1] = this.props.displayText.month3;
        break;
      case '04':
        date[1] = this.props.displayText.month4;
        break;
      case '05':
        date[1] = this.props.displayText.month5;
        break;
      case '06':
        date[1] = this.props.displayText.month6;
        break;
      case '07':
        date[1] = this.props.displayText.month7;
        break;
      case '08':
        date[1] = this.props.displayText.month8;
        break;
      case '09':
        date[1] = this.props.displayText.month9;
        break;
      case '10':
        date[1] = this.props.displayText.month10;
        break;
      case '11':
        date[1] = this.props.displayText.month11;
        break;
      case '12':
        date[1] = this.props.displayText.month12;
        break;
      default:
        date[1]='';
        break;
    }

    let hour = parseInt(time[0], 10);
    if (hour / 12 > -1) {
      noon = 'pm';
    }

    if (!(hour % 12 === 0)) {
      hour %= 12;
    }

    return (`${date[1]} ${date[2]}, ${date[0]} ${this.props.displayText.at} ${hour}:${time[1]}${noon}`);
  }

}

const Container = styled.div`
background: white;
border-top: solid 0.04vw lightgray;
border-left: solid 0.04vw lightgray;
box-shadow: 3px 3px 3px 1px rgba(0,0,0,0.4);
width: 18vw;
height: inherit;
border-radius: 0.3vw;
overflow: hidden;
border-bottom: none;
text-align: left;

`;

const WaveformContainer = styled.div`
  height:3vw;
  margin-bottom: 0.5vw;
`;

const mapStateToProps = state => {
  const { mode, playlist, playlistMode } = state.updatePlaylist;
  const { displayText } = state.geolocation;
  const users = state.user;
  return { mode, playlistMode, playlist, displayText, users };
};


const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    addToPlaylist,
    playTake,
    multipleTakes,
    clearPlaylist,
    removeTakeFromPlaylist,
    stopAudio,
    updateTime,
    playAudio,
    getComments
  }, dispatch);

};


TakeCard.propTypes = {
  count: propTypes.number.isRequired,
  take: propTypes.object.isRequired,
  author: propTypes.string.isRequired,
  onRatingSet: propTypes.func.isRequired,
  onMarkedForExportToggled: propTypes.func.isRequired,
  takeId: propTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TakeCard);
