import React from 'react';
import propTypes from 'prop-types';
import styled, {keyframes} from 'styled-components';
import {fadeIn} from 'react-animations';
import jdenticon from 'jdenticon';
import {getEmptyImage} from 'react-dnd-html5-backend';
import TopBar from './TakeCardComponents/TakeCardTopIcon';
import BottomButtons from './TakeCardComponents/TakeCardBottomButtons';
import Comments from './TakeCardComponents/TakeCardComments';
import Waveform from '../../components/audioplayer/Waveform';
import Marker from '../../components/audioplayer/Markers';
import Notification, {notify} from 'react-notify-toast';
import {connect} from 'react-redux';
import config from 'config/config';
import { addToPlaylist, playTake, multipleTakes, clearPlaylist, removeTakeFromPlaylist, stopAudio, updateTime, playAudio, getComments  } from '../../../../actions';
import { bindActionCreators } from 'redux';
import {DragSource} from 'react-dnd';
import flow from 'lodash/flow';



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
      pos: 0,
    };

    this.expandComments = this.expandComments.bind(this);
    this.trackPos = this.trackPos.bind(this);
    this.playComment = this.playComment.bind(this);
    this.recordComment =  this.recordComment.bind(this);
    this.finishedPlaying = this.finishedPlaying.bind(this);
    this.callMarker = this.callMarker.bind(this);
    this.dragPosition = this.dragPosition.bind(this);

  }

  componentDidMount() {
    jdenticon.update('#user',this.props.loggedInUser? this.props.loggedInUser: 'no author info');
    this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: true,
    });

  }

  componentDidUpdate() {
  }

  dragPosition(position) {
    this.setState({pos: position, takePlaying: true});
  }
  expandComments() {
    this.setState(prevState => ({ showComments: !prevState.showComments}));
  }

  trackPos(pos) {
    this.setState({pos: pos});
  }
  finishedPlaying() {
    this.setState({takePlaying: false,
      pos: 0});

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

    let receivedMarkersString = this.props.markers;

    let receivedMarkerObject = JSON.parse(receivedMarkersString);

    for (const key in receivedMarkerObject) {
      const position = (receivedMarkerObject[key] / 44100);
      const finalPosition = (position/this.props.duration)*100;
      // calculate the position of the marker
      // by dividing the marker position from the props, by the duration of the take
      // * by 100 and use that percatage to place the marker on the card in correct place
      // offset by 4 to account for the padding inside the taskList. If remove 4, marker moves all the way to the left
      //of the container, beyond the take card.
      markerArray.push(
        <Marker
          style={{ overflow: 'visible'}}
          visibility={true}
          translate={finalPosition}
          markerTime = {position}
          text={key}
          key = {key}
          dragPosition={this.dragPosition}
        />);
    }

    return (
      markerArray
    );
  }

  render() {
    let markers ='';
    const {connectDragSource , isDragging} = this.props;
    if (this.state.showMarkers) {
      markers = this.callMarker();
    }

    return connectDragSource (
      <div>
        <Notification />


        <Container style={{opacity: isDragging? 0.5: 1}} >
          <TopBar {...this.props} />

          <MarkerContainer>
            {markers}
          </MarkerContainer>

          <WaveformContainer>
            <Waveform
              audioFile={config.streamingUrl+this.props.location}
              playing = {this.state.takePlaying} durationTime={this.props.duration}
              trackPos = {this.trackPos}
              finishedPlaying={this.finishedPlaying}
              options= {{ cursorWidth: 2, progressColor: '#009CFF', cursorColor: '#E74C3C', barWidth: 1, hideScrollbar: true, normalize: true, height: 35, waveColor: '#969595' }}
            />
          </WaveformContainer>

          <BottomButtons {...this.props} takePlaying= {this.state.takePlaying} playTakeFromCard = {() => this.playTakeFromCard()} expandComments={() => this.expandComments()} />


          {this.state.showComments? <Comments  {...this.props} /> : '' }
        </Container>

      </div>
    );

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
      name: `${this.props.txt.take} ${takeNum}, ${this.props.txt.chunk} ${startv}  (${author} ${this.props.txt.on} ${date})`,  // in case of other mode like chunk mode or verse mode verify this
      id: takeLoc,
      chunk: `${this.props.txt.chunk} ${startv}`,          // in case of a different mode like segment or verse here is assumed that only chunks will be used
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
        date[1] = this.props.txt.month1;
        break;
      case '02':
        date[1] = this.props.txt.month2;
        break;
      case '03':
        date[1] = this.props.txt.month3;
        break;
      case '04':
        date[1] = this.props.txt.month4;
        break;
      case '05':
        date[1] = this.props.txt.month5;
        break;
      case '06':
        date[1] = this.props.txt.month6;
        break;
      case '07':
        date[1] = this.props.txt.month7;
        break;
      case '08':
        date[1] = this.props.txt.month8;
        break;
      case '09':
        date[1] = this.props.txt.month9;
        break;
      case '10':
        date[1] = this.props.txt.month10;
        break;
      case '11':
        date[1] = this.props.txt.month11;
        break;
      case '12':
        date[1] = this.props.txt.month12;
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

    return (`${date[1]} ${date[2]}, ${date[0]} ${this.props.txt.at} ${hour}:${time[1]}${noon}`);
  }

}

function getStyles(props) {
  const { left, top, isDragging } = props;
  const transform = `translate3d(${left}px, ${top}px, 0)`;

  return {
    position: 'absolute',
    transform,
    WebkitTransform: transform,
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : '',
  };
}


const fadeInAnimations =keyframes`${fadeIn}`

const Container = styled.div`
background: white;
border-top: solid 0.04vw lightgray;
border-left: solid 0.04vw lightgray;
box-shadow: 3px 3px 3px 1px rgba(0,0,0,0.4);
width: 15.5vw;
height: inherit;
border-radius: 0.3vw;
overflow: hidden;
border-bottom: none;
text-align: left;
margin-top: 1vw;
animation: ${fadeInAnimations} 1s ease-in;
cursor: pointer;
transform: translateZ(0);

`;

const WaveformContainer = styled.div`
  height:3vw;
  margin-bottom: 0.5vw;
`;

const MarkerContainer= styled.div`
margin-bottom: 2vh;
`;

TakeCard.propTypes = {
  count: propTypes.number.isRequired,
  take: propTypes.object.isRequired,
  author: propTypes.string.isRequired,
  onRatingSet: propTypes.func.isRequired,
  onMarkedForExportToggled: propTypes.func.isRequired,
  takeId: propTypes.number.isRequired,
  connectDragPreview: propTypes.func.isRequired,
};

const takeSource = {
  beginDrag(props, monitor, component) {

    return { index: props.id, rating: props.rating, take: props, active: props.active, publishedTake: props.publishedTake };
  },
  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    if (dropResult && dropResult.listId !== item.rating) {

      if (dropResult.listId == 4) {
        if (item.take.published == false && props.publishedTake == true) {
          notify.show('🚫 You can only have ONE published take, Unpublish first 🚫 ', 'warning', 5000);
        }

        else {
          props.makeChanges(
            item.take.published,
            dropResult.listId,
            item.take
          );
        }
      }

      else {
        props.makeChanges(
          item.take.published,
          dropResult.listId,
          item.take
        );
      }
    }

    else if (dropResult && dropResult.listId == 3 && item.rating == 3) {

      props.makeChanges(
        item.take.published,
        dropResult.listId,
        item.take
      );
    }

  },

};


export default
DragSource('TakeCard', takeSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  connectDragPreview: connect.dragPreview(),
}))(TakeCard);
